import React, { useState, useEffect } from "react";
import dateExtractor from "../utility/DateExtractor";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import sortData from "../utility/SortData";
import calculateTotalAmount from "../utility/CalculateTotalAmount";
import DatePicker from "./DatePicker";
import { useSelector } from "react-redux";
import SkeletonItems from "./SkeletonItems";

const Expense = () => {
  const [listOfExpenses, setListOfExpenses] = useState([]);
  const [sort, setSort] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accessToken.token);

  useEffect(() => {
    const properties = {
      month,
      year,
    };

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/expenses`, {
        headers: { accessToken },
        params: properties,
      })
      .then((response) => {
        setListOfExpenses(
          response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      });
  }, [month, year]);

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <div className="mb-4">
          <DatePicker
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </div>
        <div className="flex flex-row w-72">
          <label className="text-lg mb-2 font-semibold w-full">
            Expenses: {calculateTotalAmount(listOfExpenses)} KM
          </label>
          <div className="w-16">
            <ImportExportIcon
              onClick={() =>
                setListOfExpenses(sortData(listOfExpenses, sort, setSort))
              }
              className="mr-1 text-cyan-600/80 cursor-pointer dark:text-slate-800"
            />
            <Link to="/createexpense">
              <AddCircleOutlineIcon className="rounded-full text-cyan-600/80 dark:text-slate-800" />
            </Link>
          </div>
        </div>
        <div className="container flex flex-col overflow-auto">
          {listOfExpenses.length ? (
            listOfExpenses.map((expense, key) => {
              return (
                <div className="itemContainer shadow-md" key={key}>
                  <div
                    className="item flex justify-center"
                    onClick={() => navigate(`/expenses/${expense.id}`)}
                  >
                    <div className="titleContainer w-3/5">
                      <div className="itemDate text-sm font-normal text-gray-500">
                        {dateExtractor(new Date(expense.createdAt))}
                      </div>
                      <div className="font-mono mt-1 font-semibold">
                        {expense.title}
                      </div>
                      <div className="itemLocation text-sm font-normal text-gray-500 italic">
                        {expense.location}
                      </div>
                    </div>
                    <div className="itemValue w-2/5 font-semibold align-bottom text-red-700">
                      -{expense.value} KM
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <SkeletonItems />
          )}
        </div>
      </div>
    </div>
  );
};

export default Expense;
