import React, { useRef, useState } from "react";
import NavLink from "./NavLink";
import WalletIcon from "@mui/icons-material/Wallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Profile from "./Profile";

function NavLinks({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const btnEl = useRef();

  return (
    <>
      <NavLink path="/total" icon={<WalletIcon />} text="Wallet" />
      <NavLink path="/expenses" icon={<AttachMoneyIcon />} text="Expenses" />
      <NavLink path="/income" icon={<SavingsIcon />} text="Income" />
      <button
        ref={btnEl}
        onClick={() => setIsOpen(!isOpen)}
        className="profileButton w-16"
      >
        <div className="flex flex-col items-center">
          {<PermIdentityIcon />} <p className="text-sm text-balance">Profile</p>
        </div>
        {isOpen && <Profile setIsOpen={setIsOpen} btnEl={btnEl} />}
      </button>
    </>
  );
}

export default NavLinks;