"use client";
import {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
//@ts-ignore
import * as d3 from "d3";
import styles from "../map.module.css";
import Stars from "./stars";
import { Corporation, Tile } from "../../../../../types";
import { TilesContext } from "@/contexts/TileContext";
import { RoundContext } from "@/contexts/RoundContext";
import { Card } from "antd";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";

const Chart = () => {
  const svg = useRef<SVGSVGElement>(null);
  const tooltip = useRef(null);
  const [tileState, setTileState] = useState<Tile | null>(null);
  const [darkHour, setDarkHour] = useState<boolean>(false);
  const tiles = useContext(TilesContext);
  const round = useContext(RoundContext);
  const corporation = useContext(IndividualCorporationContext);

  const getTile = (d: { column: number; row: any }, updatedTiles: Tile[]) => {
    let column: string;
    let returnData;

    switch (d.column + 1) {
      case 1:
        column = "A";
        break;
      case 2:
        column = "B";
        break;
      case 3:
        column = "C";
        break;
      case 4:
        column = "D";
        break;
      case 5:
        column = "E";
        break;
      case 6:
        column = "F";
        break;
      case 7:
        column = "G";
        break;
      case 8:
        column = "H";
        break;
      case 9:
        column = "I";
        break;
      case 10:
        column = "J";
        break;
      case 11:
        column = "K";
        break;
      default:
        break;
    }

    const fetchedTiles = updatedTiles.filter((tile) => {
      return tile.column == column && tile.row == d.row;
    });

    if (fetchedTiles.length > 1) {
      console.error("Got wrong number of tiles");
    }

    returnData = fetchedTiles[0];

    return returnData;
  };

  const drawChart = useCallback(
    (
      svgRef: React.RefObject<SVGSVGElement>,
      tooltip: MutableRefObject<null>,
      darkHour: boolean,
      updatedTiles: Tile[],
      corporation: Corporation
    ) => {
      const h = "100%";
      const w = "100%";
      const viewBox = "0 0 1000 1000";
      const svg = d3.select(svgRef.current);
      const outerRadius = 80;
      const offset = { x: -100, y: 550 };
      const delta = { x: (outerRadius * 3) / 2, y: (outerRadius * 44) / 50 };
      const angles = [
        0,
        Math.PI / 3,
        (2 * Math.PI) / 3,
        Math.PI,
        (4 * Math.PI) / 3,
        (5 * Math.PI) / 3,
      ];
      let tooltipElement = d3.select(tooltip.current);

      //columns with row lengths
      const columns = [1, 2, 3, 4, 5, 4, 5, 4, 3, 2, 1];

      //create a 1D array of positions
      const centerPositions: {
        x: number;
        y: number;
        column: number;
        row: number;
        i: number;
      }[] = [];

      svg
        .attr("width", w)
        .attr("height", h)
        .attr("viewBox", viewBox)
        .style("margin-top", 0)
        .style("margin-left", 0);

      let j = 0;

      columns.map((column, n) => {
        for (let i = 0; i < column; i++) {
          centerPositions.push({
            x: delta.x * n + offset.x,
            y: delta.y * (-column + 2 * i) + offset.y,
            column: n,
            row: i + 1,
            i: j,
          });

          j++;
        }
      });

      const hexes = centerPositions.map((position) => {
        return angles.map((angle) => {
          return {
            x: Math.cos(angle) * outerRadius + position.x,
            y: Math.sin(angle) * outerRadius + position.y,
            column: position.column,
            row: position.row,
            i: position.i,
          };
        });
      });

      const colonizations = hexes.map((d) => {
        const tileData: any = getTile(d[0], updatedTiles);

        // tile is destroyed
        if (tileData.destroyed) return "rgba(255,0,0,0.4)";

        // tile is not colonized
        if (!tileData?.colonizedBy) return "transparent";

        // tile is colonized by someone
        if (tileData.colonizedBy.name.includes(corporation.name))
          return "rgba(0, 255, 0, 0.4)";

        // data is colonzied by enemy
        return "rgba(0, 0, 255, 0.4)";
      });

      //clear existing maps
      svg.selectAll("g.hexes").remove();
      svg.selectAll("mask").remove();

      svg
        .append("mask") // define a clip path
        .attr("id", "clip")
        .selectAll("polygon")
        .data(hexes)
        .join("polygon")
        .attr("points", (d: any[]) => {
          return d
            .map((point: { x: any; y: any }) => {
              return [point.x, point.y].join(",");
            })
            .join(" ");
        })
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", () => (darkHour ? "red" : "white"))
        .attr("filter", "drop-shadow(0px 0px 60px white)");

      svg
        .append("g")
        .attr("class", "hexes")
        .selectAll("polygon")
        .data(hexes)
        .join("polygon")
        .attr("points", (d: any[]) => {
          return d
            .map((point: { x: any; y: any }) => {
              return [point.x, point.y].join(",");
            })
            .join(" ");
        })
        .attr("stroke", "none")
        .attr("fill", (d: any[]) => {
          return colonizations[d[0]["i"]];
        })
        .on(
          "click",
          async (
            event: { clientY: string; clientX: string },
            d: { column: number; row: any }[]
          ) => {
            const tileData: any = getTile(d[0], updatedTiles);
            setTileState(tileData);
            var clientY = event.clientY;
            var clientX = event.clientX;
            if (Number(clientY) > window.innerHeight / 2)
              clientY = String(Number(clientY) - 350);
            if (Number(clientX) > window.innerWidth / 2)
              clientX = String(Number(clientX) - 350);
            tooltipElement
              .style("top", clientY + "px")
              .style("left", clientX + "px")
              .style("visibility", "visible");
          }
        );
    },
    []
  );

  useEffect(() => {
    if (tiles.tiles.length > 0) {
      drawChart(svg, tooltip, darkHour, tiles.tiles, corporation);
    }
  }, [tiles, darkHour, drawChart, corporation]);

  useEffect(() => {
    if (round != null && round.round.darkHour != darkHour)
      setDarkHour(round.round.darkHour);
  }, [round, darkHour]);

  const closeTooltip = () => {
    d3.select(tooltip.current).style("visibility", "hidden");
  };

  // const name = (tileState?.colonizedBy as Corporation).name

  return (
    <div className={styles.chart} id="chart" style={{width: '100vw', height: '100vh'}}>
      <svg ref={svg} style={{width: '100vw', height: '100vh'}}>
        <Stars />
        <ellipse
          cx="500"
          cy="480"
          rx="680"
          ry="365"
          fill="rgb(60, 20, 20)"
        ></ellipse>
        <image
          className={styles.image}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref={`${window.location.origin}/bareMap.png`}
          mask="url(#clip)"
          width="1460"
          height="920"
          x="-230"
          y="4"
          preserveAspectRatio="none"
        >
          {" "}
        </image>
      </svg>
      {/* xMinYMin meet */}

      <Card id="tooltip" ref={tooltip} className={styles.tooltip}>
        <span>
          Row: {tileState?.row} Column: {tileState?.column}
        </span>
        <p>
          Resources available:{" "}
          {tileState &&
            tileState.resourcesAvailable?.map(
              (resourceName, index, resources) => (
                <span key={index}>
                  {resourceName} {index === resources.length - 1 ? "" : ","}
                  &nbsp;
                </span>
              )
            )}
        </p>

        {tileState && tileState.landmark && (
          <p>Landmark: {tileState.landmark}</p>
        )}

        {tileState && tileState.hazards && tileState.hazards.length > 0 && (
          <p>
            Hazards:{" "}
            {tileState.hazards.map((resourceName, index, resources) => (
              <span key={index}>
                {resourceName} {index === resources.length - 1 ? "" : ","}&nbsp;
              </span>
            ))}
          </p>
        )}
        <hr
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            border: "black 1px solid",
          }}
        />

        {tileState?.destroyed ? (
          <p>Tile Destroyed</p>
        ) : (
          <>
            <p>
              Colonized By:{" "}
              {tileState
                ? tileState.colonizedBy
                  ? (tileState.colonizedBy as Corporation).name
                  : ""
                : ""}
            </p>
            <p>
              Buildings:{" "}
              {tileState &&
                tileState.buildings?.map((building, index, buildings) => {
                  return (
                    <span key={index}>
                      {building.buildingType}
                      {index == buildings.length - 1 ? "" : ","}&nbsp;
                    </span>
                  );
                })}{" "}
            </p>
          </>
        )}
        <svg
          style={{ position: "absolute", top: "5px", right: "5px" }}
          width="35"
          height="36"
          viewBox="0 0 35 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={closeTooltip}
        >
          <path
            d="M33.4055 34.5783L0.980469 2.15326L2.39447 0.739258L34.8195 33.1643L33.4055 34.5783Z"
            fill="black"
          />
          <path
            d="M1.93744 35.0072L0.523438 33.5932L32.9484 1.16821L34.3624 2.58221L1.93744 35.0072Z"
            fill="black"
          />
        </svg>
      </Card>
    </div>
  );
};

export default Chart;
