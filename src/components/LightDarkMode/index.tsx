import { useEffect, useState } from "react";

function LightDarkMode() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitch = () => {
    setIsChecked((prev) => !prev);
  };

  // const rootElement = document.getElementById("root");

  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (isChecked && rootElement) {
      rootElement.classList.add("dark");
      rootElement.style.setProperty(
        "background-image",
        "url('../src/assets/background-dark.jpg')"
      );
      rootElement.style.setProperty("background-color", "#022626");
      rootElement.style.setProperty("background-blend-mode", "overlay");
    } else if (rootElement) {
      rootElement.classList.remove("dark");
      // rootElement.style.setProperty(
      //   "background-image",
      //   "url('../src/assets/background-light.jpg')"
      // );
      rootElement.style.setProperty(
        "background-color",
        "rgba(255, 246, 248, 0.9)"
      );
      rootElement.style.setProperty("background-blend-mode", "overlay");
    }
  }, [isChecked]);

  // if (isChecked === true) {
  //   document.documentElement.classList.toggle("dark", isChecked);

  //   if (rootElement) {
  //     rootElement.style.backgroundImage =
  //       "url(../src/assets/background-dark.jpg)";
  //     rootElement.style.backgroundColor = "#022626";
  //     rootElement.style.backgroundBlendMode = "overlay";
  //   }
  // } else if (rootElement && isChecked === false) {
  //   document.documentElement.classList.remove("dark");
  //   rootElement.style.backgroundImage =
  //     "url(../src/assets/background-dark.jpg)";
  //   rootElement.style.backgroundColor = "rgba(255, 246, 248, 0.9)";
  //   rootElement.style.backgroundBlendMode = "overlay";
  // }

  return (
    <div className="flex p-3 m-3">
      <input
        id="lightdarkmode"
        type="checkbox"
        className="relative peer appearance-none w-12 h-6 border-2 dark:border-pink border-green rounded-3xl checked:bg-white-pink dark:checked:bg-white-pink active:bg-white-pink dark:active:bg-white-pink hover:bg-white-pink dark:hover:bg-white-pink focus:bg-white-pink dark:focus:bg-white-pink focus:ring-green dark:focus:ring-pink"
        checked={isChecked}
        onChange={handleSwitch}
      ></input>
      <label
        htmlFor="lightdarkmode"
        className="ps-2 cursor-pointer w-24 text-green dark:text-pink"
      >
        {isChecked ? "Dark mode" : "Light mode "}
      </label>
      <svg
        className={`absolute w-6 h-6 p-1 transition-transform ${
          isChecked ? "translate-x-6" : "-translate-x-0"
        } `}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={isChecked ? "#D97E96" : "#025E73"}
          d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
        />
      </svg>
    </div>
  );
}

export default LightDarkMode;
