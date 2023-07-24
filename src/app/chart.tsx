"use client"
import { useEffect, useRef } from "react";
//@ts-ignore
import * as d3 from "d3";
import { Coordinate } from "@/types";
import styles from './page.module.css'

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {

const h = "100%";
const w = "100%";
const viewBox = "0 0 1000 1000";
const svg = d3.select(svgRef.current);
const outerRadius = 80;
const offset = {x:-100, y:550};
const delta = {x:outerRadius*3/2,y:outerRadius*44/50}
const angles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3,5*Math.PI/3];

//columns with row lengths
const columns = [1,2,3,4,5,4,5,4,3,2,1];

//create a 1D array of positions
const centerPositions:Coordinate[] = [];

    svg
    .attr("width", w)
    .attr("height", h)
    .attr("viewBox", viewBox)
    .style("margin-top", 0)
    .style("margin-left", 0);




    columns.map((column, n) => { 
        for(let i = 0; i<column; i++) {     
          centerPositions.push({
            x: delta.x*n+offset.x,
            y: delta.y*(-column+2*i)+offset.y
          })
        }
    })
  
    const hexes = centerPositions.map(position => {
      return angles.map(angle => {
        return {
          x: Math.cos(angle)*outerRadius+position.x,
          y: Math.sin(angle)*outerRadius+position.y
        }
      })
    })

    svg
    .append("mask")       // define a clip path
    .attr("id", "clip")
    // .enter()
    .selectAll("polygon")
    .data(hexes)
    .join("polygon")
    .attr("points", (d) => {
      return d.map(point => {
        return [point.x,point.y].join(",")
      }).join(" ")
    })
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("fill", "white")
}

const Chart: React.FunctionComponent = () => {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <div className={styles.chart} id="chart">
      <svg ref={svg}>
      <image xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="bareMap.png" mask="url(#clip)" width="100vw" height="100%" x="0" y="0" preserveAspectRatio="none" > </image>
      </svg>
      {/* xMinYMin meet */}
    </div>
  );
};

export default Chart;