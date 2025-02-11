import React from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import HeadingDropDown from "../layout/HeadingDropDown";

export default function ProjectProgressGraph() {
  const windowDimensions = useWindowDimensions();
  return (
    <HeadingDropDown 
    header="Progress"
    headerStyle={{ marginLeft: windowDimensions.width * 0.08 }}
    >
      <LineChart
        data={{
          labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
          datasets: [
            {
              data: [
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
              ],
            },
          ],
        }}
        width={0.85 * windowDimensions.width} // from react-native
        height={0.5 * windowDimensions.height}
        chartConfig={{
          backgroundGradientFrom: "#64FFDA",
          backgroundGradientTo: "#14cba8",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 15,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "1",
            stroke: "#FFAE5E",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </HeadingDropDown>
  );
}
