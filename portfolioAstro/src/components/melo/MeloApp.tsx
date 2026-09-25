import { createContext, useContext, useState } from "react";
import Form from "./Form";
import ModeSwitch from "./ModeSwitch";
import Notification from "./Notification";
import Result from "./Result";
import Share from "./Share";
import Title from "./Title";

interface ResultContextType {
  standardResult: number;
  variousResult: VariousResultType | undefined;
  isResultOpen: boolean;
  isStandard: boolean;
}

export const ResultContext = createContext<ResultContextType | undefined>(
  undefined,
);

export const useResultContext = (): ResultContextType => {
  const ctx = useContext(ResultContext);
  if (!ctx) {
    throw new Error(
      "useResultContext must be used within ResultContext.Provider",
    );
  }
  return ctx;
};

export type VariousResultType = {
  variousResult: number;
  variousResultBB: number;
  variousResultCarrot: number;
};

export default function MeloApp() {
  const [weight, setWeight] = useState<number>(0);
  const [weightName, setWeightName] = useState<string>("");
  const [isStandard, setIsStandard] = useState<boolean>(true);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [standardResult, setStandardResult] = useState<number>(0);
  const [variousResult, setVariousResult] = useState<VariousResultType>();

  return (
    <ResultContext.Provider
      value={{
        standardResult,
        variousResult,
        isResultOpen,
        isStandard,
      }}
    >
      <div>
        <Title />
        <Notification />
        <ModeSwitch isStandard={isStandard} setIsStandard={setIsStandard} />
        <Form
          weight={weight}
          setWeight={setWeight}
          weightName={weightName}
          setWeightName={setWeightName}
          isResultOpen={isResultOpen}
          setIsResultOpen={setIsResultOpen}
          setStandardResult={setStandardResult}
          setVariousResult={setVariousResult}
        />
        {isResultOpen && (
          <>
            <Result
              isStandard={isStandard}
              standardResult={standardResult}
              variousResult={variousResult}
            />
            <Share
              isStandard={isStandard}
              standardResult={standardResult}
              variousResult={variousResult}
              weight={weight}
              weightName={weightName}
              setIsResultOpen={setIsResultOpen}
              setWeight={setWeight}
              setWeightName={setWeightName}
            />
          </>
        )}
      </div>
    </ResultContext.Provider>
  );
}
