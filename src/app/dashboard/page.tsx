"use client";
import Navbar from "../../components/navbar/navbar"
import Card from "../../components/dash_card/card"
import StyledDashboard from "./styled.dashboadrd"
import { StaticImageData } from "next/image";

//Import Icons
import FeedbackIcon from "../../../public/assets/feedback.png"
import StarIcon from "../../../public/assets/star.png"
import ProjectsIcon from "../../../public/assets/projects_icon.png"
import ClustersIcon from "../../../public/assets/clusters_icon.png"

// types.ts
export type Service = {
    id: number;
    title: string;
    desc: string;
    icon: StaticImageData;
    gradientColor: string;
    link: string;
};

const services: Service[] = [
    {
      id: 1,
      title: "Ghost Feedback",
      desc: "Speak Freely, Stay Anonymous!",
      icon: FeedbackIcon,
      gradientColor: "#9CE3FF",
      link: "../",
    },
    {
      id: 2,
      title: "Student Rankings",
      desc: "Stay Updated and Set Goals with Student Rankings.",
      icon: StarIcon,
      gradientColor: "#FCA277",
      link: "/services/ghost-reviews",
    },  
    {
      id: 3,
      title: "Project Correction Insights",
      desc: "Unlock Project Corrections for Enhanced Understanding.",
      icon: ProjectsIcon,
      gradientColor: "#E0F432",
      link: "/services/silent-voice",
    },
    {
      id: 4,
      title: "Clusters",
      desc: "Discover Your Community Across Three Campuses.",
      icon: ClustersIcon,
      gradientColor: "#faf8f8",
      link: "/services/secret-review",
    },
    {
      id: 5,
      title: "improved intra",
      desc: "Discover Your Community Across Three Campuses.",
      icon: ClustersIcon,
      gradientColor: "#faf8f8",
      link: "/services/secret-review",
    },
  ];
  
const Dashboard = () =>{
    return (
        <StyledDashboard>
            <div className="Services_container">
                {
                    services.map((service) =>{
                        return (
                            <Card key={service.id} title={service.title} desc={service.desc} gradientColor={service.gradientColor} icon={service.icon} link={service.link}/>
                        )
                    })
                }
            </div>
        </StyledDashboard>
    )
}

export default Dashboard;