import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveDemo } from "@/components/live-demo/LiveDemo";
import { EventClasses } from "@/components/EventClasses";
import { Pipeline } from "@/components/Pipeline";
import { AccidentAnticipation } from "@/components/AccidentAnticipation";
import { EDA } from "@/components/EDA";
import { SampleVideos } from "@/components/SampleVideos";
import { TechnicalApproach } from "@/components/TechnicalApproach";
import { Evaluation } from "@/components/Evaluation";
import { Team } from "@/components/Team";
import { TechStack } from "@/components/TechStack";
import { Report } from "@/components/Report";
import { FailureAnalysis } from "@/components/FailureAnalysis";
import { GithubSection } from "@/components/GithubSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />
      <Hero />
      <LiveDemo />
      <EventClasses />
      <Pipeline />
      <AccidentAnticipation />
      <EDA />
      <SampleVideos />
      <TechnicalApproach />
      <Evaluation />
      <Team />
      <TechStack />
      <Report />
      <FailureAnalysis />
      <GithubSection />
      <Footer />
    </main>
  );
}
