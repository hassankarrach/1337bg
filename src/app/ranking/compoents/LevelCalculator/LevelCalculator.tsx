import React, { useEffect, useState } from "react";
//ProjectsData
import { calculateLevel } from "./utils";
import { Project } from "./types";
import {
  StyledAutocomplete,
  StyledLevelCalculator,
} from "./LevelCalculator.styled";
import {
  FaToggleOn,
  FaToggleOff,
  FaFolderPlus,
  FaFolder,
  FaAngleDoubleDown as DoubleDown,
  FaAngleDoubleUp as DoubleUp,
  FaRedoAlt as ResetIcon,
} from "react-icons/fa";
import ProjectsData from "@/data/Projects";
import TextField from "@mui/material/TextField";

const LevelCalculator = () => {
  const [startLevel, setStartLevel] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [score, setScore] = useState<number>(100);
  const [includeBonus, setIncludeBonus] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [strictMode, setStrictMode] = useState(false);

  useEffect(() => {
    setProjects(ProjectsData);
  }, []);

  const handleCalculate = () => {
    const plannedXp = projects[0].xp || 0;
    const calculatedLevel = calculateLevel(3.96, plannedXp, 100, false);
    // setResult(Number(calculatedLevel.toFixed(2)));
    console.log(calculatedLevel);
  };

  return (
    <StyledLevelCalculator>
      <h1 className="title">Level Calculator :</h1>
      <div className="strict" onClick={() => setStrictMode(!strictMode)}>
        Strict
        {strictMode ? (
          <FaToggleOn color="#56ab2f" size={22} />
        ) : (
          <FaToggleOff color="#454548" size={22} />
        )}
      </div>
      <div className="container">
        <div className="SelectedProjects">
          {projectList.map((item: Project) => {
            return <ProjectItem title={item.title} xp={item.xp} />;
          })}
        </div>

        <div className="AddNewProject">
          <div className="SelectContainer">
            <StyledAutocomplete
              disablePortal
              id="combo-box-demo"
              options={projects}
              getOptionLabel={(option: any) => option.title}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  color="primary"
                  {...params}
                  label="Select a project"
                />
              )}
            />
            <input type="number" placeholder="XP" />
          </div>

          
          <div className="AddIcon">
            <FaFolderPlus size={20} color={"var(--main_color_dark)"} />
          </div>
        </div>

        <div className="ReseltContainer">
          <div className="Level_box">
            <span>Final Level:</span>
            <span>4.6</span>
          </div>
          <div className="ResetContainer">
            <span>Reset</span>
            <ResetIcon />
          </div>
        </div>
      </div>
    </StyledLevelCalculator>
  );
};

const ProjectItem = ({ title, xp }: { title: string; xp: number }) => {
  return (
    <div className="ProjectItem">
      <h1>
        <FaFolder /> {title}
      </h1>
      <span>{xp} XP</span>
    </div>
  );
};

export default LevelCalculator;
