"use client"
import { useEffect, useRef } from "react";
//@ts-ignore
import * as d3 from "d3";
import { Coordinate } from "@/types";
import styles from '../page.module.css'
import Stars from "./stars"

//there's some weirdness with the image tag




const Chart: React.FunctionComponent = () => {
  const svg = useRef<SVGSVGElement>(null);

  const getTile = (d) => {
    let column;

    switch (d.column+1) {
      case 1:
        column = "A"
        break;
      case 2:
        column = "B"
        break;
      case 3:
        column = "C"
        break;
      case 4:
        column = "D"
        break;
      case 5:
        column = "E"
        break;
      case 6:
        column = "F"
        break;
      case 7:
        column = "G"
        break;
      case 8:
        column = "H"
        break;
      case 9:
        column = "I"
        break;
      case 10:
        column = "J"
        break;
      case 11:
        column = "K"
        break;
      default:
        break;
    }

    fetch(`/api/tile?row=${d.row}&column=${column}`)
    .then(res=> res.json())
    .then(data => {
      console.log(data.tile)
    }) 
  }

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
    const centerPositions = [];
    
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
                y: delta.y*(-column+2*i)+offset.y,
                column: n,
                row: i+1,
              })
            }
        })
      
        const hexes = centerPositions.map(position => {
          return angles.map(angle => {
            return {
              x: Math.cos(angle)*outerRadius+position.x,
              y: Math.sin(angle)*outerRadius+position.y,
              column: position.column,
              row: position.row,
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
        .attr("filter", "drop-shadow(6px 10px 100px white)")

        svg
        .append("g")
        .selectAll("polygon")
        .data(hexes)
        .join("polygon")
        .attr("points", (d) => {
          return d.map(point => {
            return [point.x,point.y].join(",")
          }).join(" ")
        })
        .attr("stroke","none")
        .attr("fill", "transparent")
        .on("click", (event, d) => getTile(d[0]) )
    }

  useEffect(() => {
    drawChart(svg);
  }, [svg]);



  return (
    <div className={styles.chart} id="chart">
      <svg ref={svg}>
        <Stars/>
        <ellipse  cx="500" cy="480" rx="680" ry="365" fill="rgb(60, 20, 20)"></ellipse>
        <image xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="bareMap.png" mask="url(#clip)" width="100vw" height="100%" x="-400" y="0"
        preserveAspectRatio="none"
        > </image>
      </svg>
      {/* xMinYMin meet */}
    </div>
  );
};

export default Chart;