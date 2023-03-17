import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GiStrawberry } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Swal from "sweetalert2";

const numRegex = /^[0-9]{10}$/;

const schema = yup
  .object({
    number: yup
      .string()
      .matches(numRegex, "el numero telefonico debe ser de 10 digitos")
      .required("no ha ingresado el numero telefonico"),
  })
  .required();

const LoginWithPhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const generateRecaptch = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          'size': 'invisible',
          'callback': (response) => {},
        },
        auth
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendSMS = (number, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `+57${number}`, recaptchaVerifier)
      .then((response) => {
        window.confirmationResult = response;
        Swal.fire(
          "Exelente!!",
          `Enviamos el mensaje a ${number}`,
          "success"
        ).then(() => {
          navigate("/insertcode");
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Ups!! hubo un problema",
          `Este es el problema ${error}`,
          "error"
        );
      });
  };

  const onSubmit = (data) => {
    console.log(data);
    generateRecaptch();
    sendSMS(data.number, window.recaptchaVerifier);
  };

  return (
    <div className="p-4">
      <section className="formphone">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="formphone p-5 flex flex-col gap-5 text-center"
        >
          <GiStrawberry className="drop-shadow-2xl text-shadow text-blue-400 text-5xl self-center" />
          <label htmlFor="" className="flex flex-col gap-3">
            <span>Ingrese un número de telefono</span>
            <input
              {...register("number")}
              className="border-2 border-blue-200 p-2 rounded-md"
              type="text"
              placeholder="número de télefono"
            />
          </label>
          {errors.number ? (
            <span className="bg-red-200 p-2 text-white">
              {errors.number.message}
            </span>
          ) : (
            <></>
          )}
          <button type="submit" className="bg-blue-300 p-3 rounded-md">
            Enviar sms
          </button>
        </form>
        <div id="recaptcha-container"></div>
      </section>
    </div>
  );
};

export default LoginWithPhone;
