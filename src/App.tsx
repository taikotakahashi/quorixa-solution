import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { MobileDevelopment } from "./pages/services/MobileDevelopment";
import { DedicatedTeams } from "./pages/services/DedicatedTeams";
import { AIML } from "./pages/services/AIML";
import { DataStudio } from "./pages/services/DataStudio";
import { DesignStudio } from "./pages/services/DesignStudio";
import { QualityAssurance } from "./pages/services/QualityAssurance";
import { Backend } from "./pages/services/Backend";
import { Frontend } from "./pages/services/Frontend";
import { Accessibility } from "./pages/services/Accessibility";
import { About } from "./pages/About";
import { OurWork } from "./pages/OurWork";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { Insights } from "./pages/Insights";
import { InsightDetail } from "./pages/InsightDetail";
import { CaseStudyDetail } from "./pages/CaseStudyDetail";
import { JobDetail } from "./pages/JobDetail";
import { JobApply } from "./pages/JobApply";
import { Solutions } from "./pages/Solutions";
import { Industries } from "./pages/Industries";
import { Technologies } from "./pages/Technologies";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mobile-development" element={<MobileDevelopment />} />
          <Route path="dedicated-teams" element={<DedicatedTeams />} />
          <Route path="ai-ml" element={<AIML />} />
          <Route path="data-studio" element={<DataStudio />} />
          <Route path="design-studio" element={<DesignStudio />} />
          <Route path="quality-assurance" element={<QualityAssurance />} />
          <Route path="backend-development" element={<Backend />} />
          <Route path="frontend-development" element={<Frontend />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="about" element={<About />} />
          <Route path="our-work" element={<OurWork />} />
          <Route path="our-work/:id" element={<CaseStudyDetail />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:id/apply" element={<JobApply />} />
          <Route path="careers/:id" element={<JobDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:id" element={<InsightDetail />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="industries" element={<Industries />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
