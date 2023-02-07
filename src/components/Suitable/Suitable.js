import React, { useState } from "react";
import styles from "./Suitable.module.scss";
import { data } from "./data";

const colorPallate = (index, currentStep, labelArray) => {
  if (currentStep === labelArray.length && currentStep === index + 1) {
    return "lastStageText";
  } else if (index + 1 === labelArray.length) {
    return "lastDeActiveStageText";
  } else if (currentStep === index + 1) {
    return "currentStage";
  } else if (currentStep > index + 1) {
    return "previousStage";
  } else {
    return "upcomingStage";
  }
};
const colorPallateForMiddleLine = (index, currentStep, labelsArray) => {
  if (currentStep > index + 1) {
    return "previousStage";
  } else {
    return "upcomingMiddleLine";
  }
};
export const Suitable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [datas, setData] = useState(data);
  const handleSearch = (event) => {
    // let value = event.target.value;
    setSearchValue(event.target.value);
    showSearchedData(event.target.value)
    
   

  };


  const showSearchedData = (value)=>{
    let result = data.filter((element,index)=>{
      
        if(element.candidate.substring(0,value.length).toLowerCase()===value.toLowerCase()){
          console.log("my element",element.candidate,"and value",value)
         return element
        }
    })
 //  console.log("my result array",result)
  setData(result)
}
  let labelArray = ["1", "2", "3", "4", "5"];

  const middleLine = (index, currentStep, labelArray) => {
    if (labelArray.length > index + 2) {
      return (
        <div
          className={`${styles["middleLine"]} ${
            styles[colorPallateForMiddleLine(index, currentStep, labelArray)]
          }`}
        ></div>
      );
    } else if (labelArray.length > index + 1) {
      return (
        <div
          className={`${
            currentStep !== labelArray.length
              ? styles["dottedLine"]
              : styles["lastmiddleLine"]
          }`}
        ></div>
      );
    }
  };

  const stepper = (currentStep = 3, rewardValue) => {
    return (
      <div className={`${styles["stepWrapper"]}`}>
        {labelArray.map((item, index) => (
          <div
          key={index}
            style={{ width: 100 / 5 + "%" }}
            className={`${styles["boxes"]}`}
          >
            <div className={`${styles["stages"]}`}>
              {labelArray.length > index + 1 ? (
                <div
                  className={`${styles["circle"]} ${
                    styles[colorPallate(index, currentStep, labelArray)]
                  }`}
                >
                  {index + 1}
                </div>
              ) : (
                <div
                  className={`${
                    styles[colorPallate(index, currentStep, labelArray)]
                  }`}
                >
                  &#x24;{rewardValue}
                </div>
              )}
              {middleLine(index, currentStep, labelArray)}
              {/* {labelArray.length > index+2  ? (
              
            ) : ({labelArray.length})} */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["upperpart"]}`}>
        {/* <div></div>
         */}
      </div>
      <div className={`${styles["mainContainer"]}`}>
      <div className={`${styles["referalBox"]}`}>Refferal Status</div>
      <input
        className={`${styles["searchBox"]}`}
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(event) => handleSearch(event)}
      />
      <div className={`${styles["suitableContainer"]}`}>
        <div className={`${styles["tabContainer"]}`}>
          <div>Candidate</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "42%",
              paddingLeft:"22px",
              boxSizing:"border-box"
            }}
          >
            <div>Reffered</div>
            <div>Interviewed</div>
            <div>Hired</div>
            <div>Joined</div>{" "}
          </div>

          <div>Reward</div>
        </div>
        <div className={`${styles["listContainer"]}`}>
          {datas &&
            datas.map((element, index) => (
              <div
              key={index}
                className={`${styles["itemContainer"]} ${
                  index % 2 === 0 ? styles["itemBackground"] : null
                }`}
              >
                <div className={`${styles["nameContainer"]}`} >
                  {element.candidate}
                </div>
                {stepper(element.currentStage, element.reward)}
              </div>
            ))}
        </div>
      </div>
      </div>
    </div>
  );
};
