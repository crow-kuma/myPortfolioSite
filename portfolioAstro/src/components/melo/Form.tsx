import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { VariousResultType } from "./MeloApp";

type FormProps = {
  weight: number;
  weightName: string;
  setWeight: (weight: number) => void;
  setWeightName: (weightName: string) => void;
  isResultOpen: boolean;
  setIsResultOpen: (isOpen: boolean) => void;
  setStandardResult: (standardResult: number) => void;
  setVariousResult: (variousResult: VariousResultType) => void;
};

interface FormInputs {
  weight: string;
  weightName: string;
}

export default function Form({
  setWeight,
  setWeightName,
  isResultOpen,
  setIsResultOpen,
  setStandardResult,
  setVariousResult,
}: FormProps) {
  const MELO_WEIGHT = 338;
  const MELO_BB_WEIGHT = 20;
  const CARROT_WEIGHT = 0.2;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      weight: "",
      weightName: "",
    },
  });

  const watchedWeight = watch("weight");
  const watchedWeightName = watch("weightName");

  const displayWeight =
    watchedWeight && watchedWeight.trim() !== "" ? watchedWeight : "？？？";
  const displayName =
    watchedWeightName && watchedWeightName.trim() !== ""
      ? watchedWeightName
      : "？？？";

  const errorMessage = errors.weight?.message || errors.weightName?.message;

  useEffect(() => {
    if (!isResultOpen) {
      reset({ weight: "", weightName: "" });
      setWeight(0);
      setWeightName("");
    }
  }, [isResultOpen, reset, setWeight, setWeightName]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const numWeight = parseFloat(data.weight.trim());
    const cleanWeightName = data.weightName.trim();

    const standardResult = Math.round((numWeight / MELO_WEIGHT) * 100) / 100;
    const variousResult = Math.floor(numWeight / MELO_WEIGHT);
    const variousResultBB = Math.floor(
      (numWeight % MELO_WEIGHT) / MELO_BB_WEIGHT,
    );
    const variousResultCarrot = Math.round(
      ((numWeight % MELO_WEIGHT) % MELO_BB_WEIGHT) / CARROT_WEIGHT,
    );

    setWeight(numWeight);
    setWeightName(cleanWeightName);
    setStandardResult(standardResult);
    setVariousResult({
      variousResult,
      variousResultBB,
      variousResultCarrot,
    });
    setIsResultOpen(true);
  };

  useEffect(() => {
    if (!isResultOpen) return;
    const el = document.getElementById("result");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [isResultOpen]);

  return (
    <form className="main" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="main-input">
        <div className="main-input-box">
          <label htmlFor="inputWeight" className="main-inputWeight">
            おもさ
          </label>
          <input
            type="text"
            inputMode="decimal"
            id="inputWeight"
            placeholder="重さを書いてね！"
            className={errors.weight ? "input-has-error" : ""}
            {...register("weight", {
              required: "おもさを教えてほしいな！",
              validate: (value) => {
                const trimmed = value.trim();
                if (!trimmed) {
                  return "おもさを教えてほしいな！";
                }
                if (!/^\d+(\.\d+)?$/.test(trimmed)) {
                  return "数字で教えてね！（小数はOKだよ）";
                }
                if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
                  return "小数は第2位までにしてね！";
                }
                const num = parseFloat(trimmed);
                if (Number.isNaN(num) || num <= 0) {
                  return "0より大きい数字を入れてね！";
                }
                if (num > 999999) {
                  return "わわっ！そんなに重いものは測れないよ〜！（999,999kgまでにしてね）";
                }
                return true;
              },
            })}
          />
        </div>
        <div className="main-input-box">
          <label htmlFor="inputWeightName" className="main-inputWeightName">
            なまえ
          </label>
          <input
            type="text"
            id="inputWeightName"
            placeholder="名前を書いてね！"
            className={errors.weightName ? "input-has-error" : ""}
            {...register("weightName", {
              maxLength: {
                value: 20,
                message:
                  "お名前がちょっと長すぎるみたい…！（20文字までにしてね）",
              },
            })}
          />
        </div>
      </div>
      {errorMessage && (
        <div className="melo-balloon-wrapper">
          <div className="melo-error-balloon" role="alert">
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      <div className="main-summary">
        <p>{displayWeight}kgの</p>
        <p>{displayName}は…</p>
      </div>
      <button type="submit" className="main-button">
        何メロディーレーン？
      </button>
    </form>
  );
}
