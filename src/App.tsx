import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BootGate } from "./components/PageLoader";
import { lazyPage } from "./lib/lazyPage";

const Home = lazyPage(() => import("./pages/Home"), "Home");
const MobileDevelopment = lazyPage(
  () => import("./pages/services/MobileDevelopment"),
  "MobileDevelopment",
);
const DedicatedTeams = lazyPage(
  () => import("./pages/services/DedicatedTeams"),
  "DedicatedTeams",
);
const AIML = lazyPage(() => import("./pages/services/AIML"), "AIML");
const DataStudio = lazyPage(
  () => import("./pages/services/DataStudio"),
  "DataStudio",
);
const DesignStudio = lazyPage(
  () => import("./pages/services/DesignStudio"),
  "DesignStudio",
);
const QualityAssurance = lazyPage(
  () => import("./pages/services/QualityAssurance"),
  "QualityAssurance",
);
const Backend = lazyPage(() => import("./pages/services/Backend"), "Backend");
const Frontend = lazyPage(
  () => import("./pages/services/Frontend"),
  "Frontend",
);
const Accessibility = lazyPage(
  () => import("./pages/services/Accessibility"),
  "Accessibility",
);
const About = lazyPage(() => import("./pages/About"), "About");
const Leadership = lazyPage(() => import("./pages/Leadership"), "Leadership");
const OurWork = lazyPage(() => import("./pages/OurWork"), "OurWork");
const Careers = lazyPage(() => import("./pages/Careers"), "Careers");
const Contact = lazyPage(() => import("./pages/Contact"), "Contact");
const Insights = lazyPage(() => import("./pages/Insights"), "Insights");
const InsightDetail = lazyPage(
  () => import("./pages/InsightDetail"),
  "InsightDetail",
);
const CaseStudyDetail = lazyPage(
  () => import("./pages/CaseStudyDetail"),
  "CaseStudyDetail",
);
const JobDetail = lazyPage(() => import("./pages/JobDetail"), "JobDetail");
const JobApply = lazyPage(() => import("./pages/JobApply"), "JobApply");
const Solutions = lazyPage(() => import("./pages/Solutions"), "Solutions");
const Industries = lazyPage(() => import("./pages/Industries"), "Industries");
const Technologies = lazyPage(
  () => import("./pages/Technologies"),
  "Technologies",
);
const NotFound = lazyPage(() => import("./pages/NotFound"), "NotFound");

export default function App() {
  return (
    <BrowserRouter>
      <BootGate>
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
            <Route path="leadership" element={<Leadership />} />
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
      </BootGate>
    </BrowserRouter>
  );
}
