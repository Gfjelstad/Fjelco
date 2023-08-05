import useAuth from "@/hooks/useAuth";
import { loginUser } from "@/methods/auth";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";

interface PinInputProps {
  maxAttempts?: number;
}

const Login: React.FC<PinInputProps> = ({ maxAttempts = 10 }) => {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleLogin = async () => {
    const thisPin: string = pin.join("");
    const result = await loginUser(thisPin).then((res) => {
      setTimeout(() => {
        console.log(res);

        window.location.reload();
        router.push("/Finance");
      }, 200);
    });
    // Perform login logic here
    console.log("loginresult", result);
  };
  const handlePinChange = (index: number, value: string) => {
    if (value.match(/^\d*$/) && value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to the next input when a digit is entered
      if (index < 5 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);

      // Move to the previous input when backspace is pressed and the current input is empty
      if (index > 0 && newPin[index] === "") {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const isPinComplete = () => {
    return pin.every((digit) => digit !== "");
  };

  const handleReset = () => {
    setPin(["", "", "", "", "", ""]);
    setAttempts(0);
  };

  const handleAttempt = async () => {
    if (!isPinComplete()) return;

    setAttempts((prevAttempts) => prevAttempts + 1);

    // Check the PIN here, and handle the correct/wrong attempts accordingly.
    // For this example, let's just show an alert with the entered PIN.
    await handleLogin();

    // Clear the PIN after every attempt
    setPin(["", "", "", "", "", ""]);
    // Focus the first input after the attempt
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-[20px] items-center justify-center">
      <h2>Enter 6-digit PIN:</h2>
      <div>
        {Array.from({ length: 6 }, (_, index) => (
          <input
            className="rounded-[10px] border border-[#00000040] h-[40px] text-[20px]"
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={pin[index]}
            onChange={(e) => handlePinChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ marginRight: "10px", width: "30px", textAlign: "center" }}
          />
        ))}
      </div>
      <button
        className="rounded-[10px] bg-[#0066FF] text-[#fff] text-[16px] h-[30px] w-[60px] flex items-center justify-center"
        onClick={handleAttempt}
        disabled={!isPinComplete()}
      >
        Log In
      </button>
      <button onClick={handleReset}>Reset</button>
      <p>
        Attempts: {attempts} / {maxAttempts}
      </p>
    </div>
  );
};
// className="w-full h-screen flex flex-col gap-[20px] items-center justify-center"
export default Login;
