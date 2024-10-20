import React, { useEffect, useState } from "react";
//ProjectsData
import { calculateLevel } from "./utils";
import { Project } from "./types";
import { StyledLevelCalculator } from "./LevelCalculator.styled";
import {
  FaToggleOn,
  FaToggleOff,
  FaFolderPlus,
  FaFolder,
  FaAngleDoubleDown as DoubleDown,
  FaAngleDoubleUp as DoubleUp,
  FaRedoAlt as ResetIcon,
  FaMedal as RankIcon,
} from "react-icons/fa";
import ProjectsData from "@/data/Projects";
import TextField from "@mui/material/TextField";
import { Autocomplete, Checkbox } from "@mui/material";

interface ProjectItem {
  title: string;
  mark: number;
  is_coalition: boolean;
}

interface LevelCalculatorProps {
  StudentData: {
    level: number;
  };
}

const LevelCalculator: React.FC<LevelCalculatorProps> = ({ StudentData }) => {
  // Data
  const [projects, setProjects] = useState<Project[]>([]);
  // NewProject properties
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [score, setScore] = useState<number>(0);
  const [IncludeCoalition, setIncludeCoalition] = useState<boolean>(false);

  // Result handling
  const [CurrLevel, setCurrLevel] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  // ProjectList
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);

  useEffect(() => {
    setProjects(ProjectsData);
    if (StudentData) setCurrLevel(StudentData.level);
  }, [StudentData]);

  const handleCalculate = () => {
    if (selectedProject) { // Ensure selectedProject is not null
      const SelectedProjectData = projects.find(
        (project) => project.title === selectedProject.title
      );
  
      const calculatedLevel = calculateLevel(
        CurrLevel,
        SelectedProjectData?.xp || 0,
        score,
        IncludeCoalition
      );
  
      setCurrLevel(Number(calculatedLevel.toFixed(2)));
    } else {
      // Handle case where no project is selected
      // console.error("No project selected");
    }
  };
  

  const onProjectChange = (event: any, value: Project | null) => {
    setSelectedProject(value); // Update the state with the selected project
  };

  const onScoreChange = (event: any) => {
    setScore(event.target.value);
  };

  const onAddProject = () => {
    // push new Project to the ProjectList
    const newProject: ProjectItem = {
      title: selectedProject ? selectedProject.title : "",
      mark: score,
      is_coalition: IncludeCoalition,
    };

    handleCalculate();
    // Reset Stats
    setProjectList([...projectList, newProject]);
    setSelectedProject(null);
    setScore(0);
    setIncludeCoalition(false);
  };

  const onReset = () => {
    setProjectList([]);
    setIncludeCoalition(false);
    setScore(0);
    setCurrLevel(StudentData.level);
    setSelectedProject(null);
  };

  return (
    <StyledLevelCalculator>
      <h1 className="title">Level Calculator :</h1>

      <div className="container">
        <div className="SelectedProjects">
          {projectList.map((item: ProjectItem, key) => {
            return <ProjectItem key={key} title={item.title} xp={item.mark} />;
          })}
        </div>

        <div className="AddNewProject">
          <Autocomplete
            value={selectedProject}
            onChange={onProjectChange}
            className="AutoComplete"
            id="combo-box-demo"
            options={projects}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Project" variant="outlined" />
            )}
          />
          <input
            className="MarkInput"
            type="input"
            value={score ? score : ""}
            placeholder="mark (Ex: 125)"
            onChange={onScoreChange}
          />

          <div className="Coalition">
            <Checkbox
              className="CheckBox"
              checked={IncludeCoalition}
              onChange={(e) => setIncludeCoalition(e.target.checked)}
            />
            <label>Coalition</label>
          </div>

          <div className="AddIcon" onClick={onAddProject}>
            <FaFolderPlus size={20} color={"var(--main_color_dark)"} />
          </div>
        </div>

        <div className="ResultContainer">
          <div className="Level_box">
            <div className="FinalLevel">
              <span>Level :</span>
              <span>{CurrLevel}</span>
            </div>

            {/* <div className="NewRank">
              <RankIcon className="RankIcon" />
              <span className="Rank">#13</span>
              <span>(</span>
              <span>55</span>
              <DoubleUp className="RankDifIcon" />
              <span>)</span>
            </div> */}
          </div>
          <div className="ResetContainer" onClick={onReset}>
            <span>Reset</span>
            <ResetIcon size={15} className="ResetIcon" />
          </div>
        </div>
      </div>
    </StyledLevelCalculator>
  );
};

const ProjectItem = ({ title, xp }: { title: string; xp: number }) => {
  return (
    <div className="ProjectItem">
      <div className="ProjectTitle">
        <FaFolder />
        <h1>{title}</h1>
      </div>
      <span>{xp} %</span>
    </div>
  );
};

export default LevelCalculator;
