import React from "react";
import { GiStrawberry } from "react-icons/gi";

const InsertCode = () => {
  return (
    <div className="formphone m-5 text-center">
      <form action="" className="p-9 flex flex-col gap-5">
        <GiStrawberry className="drop-shadow-2xl text-shadow text-blue-400 text-5xl self-center" />
        <label htmlFor="" className="flex flex-col gap-3">
          <span>Ingrese el código de verificación</span>
          <input
            className="border-2 border-blue-200 p-2 rounded-md"
            type="text"
            placeholder="código sms"
          />
        </label>
        <button className="bg-blue-300 p-3 rounded-md">Verificar código</button>
      </form>
    </div>
  );
};

export default InsertCode;
