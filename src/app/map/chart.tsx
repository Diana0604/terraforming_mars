"use client"
import { useEffect, useRef, useState } from "react";
//@ts-ignore
import * as d3 from "d3";
import { Coordinate } from "@/types";
import styles from '../page.module.css'
import Stars from "./stars"
import { Tile } from "../../types"

//there's some weirdness with the image tag




const Chart: React.FunctionComponent = () => {
  const svg = useRef<SVGSVGElement>(null);
  const tooltip = useRef(null)
  const [tileState, setTileState] = useState<Tile|null>(null);

  const getTile = (d) => {
    let column;
    let returnData;

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
      setTileState(data.tile);
      returnData = data.tile;
    }) 

    return returnData;
  }

  function drawChart(svgRef: React.RefObject<SVGSVGElement>, tooltip) {

    const h = "100%";
    const w = "100%";
    const viewBox = "0 0 1000 1000";
    const svg = d3.select(svgRef.current);
    const outerRadius = 80;
    const offset = {x:-100, y:550};
    const delta = {x:outerRadius*3/2,y:outerRadius*44/50}
    const angles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3,5*Math.PI/3];
    let tooltipElement = d3.select(tooltip.current)
    
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
        .on("click", (event, d) => {
          const tileData:Tile | void = getTile(d[0]);
          tooltipElement
            .style("top", event.clientY + "px")
            .style("left", event.clientX + "px")
            .style("visibility", "visible")

        })




          // .on('click', (e) => {
          //   return tooltipElement.style("top", e.mouseY)
          //     .style("left", e.mouseX)
          // })


    }

  useEffect(() => {
    drawChart(svg, tooltip);
  }, [svg, tooltip]);

  const closeTooltip = () => {
    d3.select(tooltip.current)
      .style("visibility","hidden")
  }


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
      <div id="tooltip" ref={tooltip} className={styles.tooltip}>
        <p>Row: {tileState?.row}</p>
        <p>Column: {tileState?.column}</p>
        { tileState && tileState.resourcesAvailable?.map(resource => {
          return <p>Resource: {resource}</p>
        })}
        <p>Colonized By: {tileState?.colonizedBy?.name}</p>
        <svg style={{ position: "absolute", top: "5px", right: "5px"}} width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={closeTooltip}>
          <path d="M33.4055 34.5783L0.980469 2.15326L2.39447 0.739258L34.8195 33.1643L33.4055 34.5783Z" fill="black"/>
          <path d="M1.93744 35.0072L0.523438 33.5932L32.9484 1.16821L34.3624 2.58221L1.93744 35.0072Z" fill="black"/>
        </svg>
      </div>
    </div>
  );
};

export default Chart;