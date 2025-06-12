import { motion } from "framer-motion";

const ResumeTemplate = ({ isPrintMode = false }: { isPrintMode?: boolean }) => {
  const Container = isPrintMode ? 'div' : motion.div;

  return (
    <Container className="max-w-5xl mx-auto bg-white p-10 text-black">
      <header className="border-b-2 border-black pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-3 text-black">Dinesh Wayaman</h1>
        <p className="text-2xl mb-4 text-black">Software Engineer</p>
        <div className="flex flex-wrap gap-4 text-base text-black">
          {[
            { href: "https://dineshwayaman.com", text: "dineshwayaman.com" },
            { href: "mailto:dineshwayaman@gmail.com", text: "dineshwayaman@gmail.com" },
            { href: "tel:+94779780991", text: "+94 779 780 991" },
            { href: "https://github.com/dineshwayaman", text: "github.com/dineshwayaman" },
            { href: "https://www.linkedin.com/in/dineshwayaman/", text: "linkedin.com/in/dineshwayaman" }
          ].map((contact, index) => (
            <a key={contact.href} href={contact.href} className="underline text-black">
              {contact.text}
              {index < 4 && " | "}
            </a>
          ))}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2 uppercase text-black">
          Professional Summary
        </h2>
        <p className="leading-relaxed text-lg">
          Versatile Full-stack Developer with proven expertise in mobile and web development. 
          Specialized in Flutter, React Native, and Next.js, delivering scalable solutions 
          with exceptional user experiences. Track record of successful project leadership and 
          innovative problem-solving. Strong focus on modern development practices and emerging technologies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2 uppercase text-black">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-b border-gray-100 pb-2">
            <h3 className="font-bold mb-3 uppercase">Mobile Development</h3>
            <ul className="list-none space-y-2">
              {[
                "Flutter",
                "Native Android (Java/Kotlin)",
                "Mobile App Architecture",
                "Play Store & App Store Deployment",
                "Cross-platform Development"
              ].map((skill) => (
                <li key={skill} className="border-b border-gray-50 pb-1">
                  • {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-b border-gray-100 pb-2">
            <h3 className="font-bold mb-3 uppercase">Web Development</h3>
            <ul className="list-none space-y-2">
              {[
                "Next.js (Advanced)",
                "Laravel & WordPress",
                "TypeScript / JavaScript",
                "REST APIs Development",
                "Tailwind CSS / SCSS"
              ].map((skill) => (
                <li key={skill} className="border-b border-gray-50 pb-1">
                  • {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-2">
            <h3 className="font-bold mb-3 uppercase">Cloud & Infrastructure</h3>
            <ul className="list-none space-y-2">
              {[
                "AWS (EC2, S3, RDS)",
                "Firebase (Auth, Firestore)",
                "Docker Containerization",
                "Database Design & Optimization",
                "Server Management"
              ].map((skill) => (
                <li key={skill} className="border-b border-gray-50 pb-1">
                  • {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-2">
            <h3 className="font-bold mb-3 uppercase">Additional Skills</h3>
            <ul className="list-none space-y-2">
              {[
                "AI Tools Integration",
                "ChatGPT & Copilot Proficiency",
                "Version Control (Git)",
                "Performance Optimization",
                "Project Management"
              ].map((skill) => (
                <li key={skill} className="border-b border-gray-50 pb-1">
                  • {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2 uppercase text-black">
          Work Experience
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold">SOFTWARE ENGINEER</h3>
            <p className="mb-2">CEYLON BUSINESS APPLIENCES • 2023 - Present</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Developed and maintained POS systems using Native Android (Java)</li>
              <li>Working with Flutter and React Native development</li>
              <li>Delivered high-quality solutions within deadlines</li>
              <li>Collaborated effectively in a team environment</li>
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold">SOFTWARE DEVELOPMENT CONSULTANT</h3>
            <p className="mb-2">MENDISONE • 2023 - Present</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Led web and Android app development projects</li>
              <li>Utilized Flutter, React Native, Spring Boot, React, Laravel, and NEXT.js</li>
              <li>Provided consultancy services and technical guidance</li>
              <li>Contributed to client success and project excellence</li>
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold">SOFTWARE DEVELOPER</h3>
            <p className="mb-2">MENDISONE • 2022 - 2023</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Developed web and Android applications</li>
              <li>Worked with Laravel, WordPress, and Android native development</li>
              <li>Delivered high-quality code and maintained coding standards</li>
              <li>Collaborated with team members to meet project objectives</li>
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold">JUNIOR SOFTWARE DEVELOPER</h3>
            <p className="mb-2">MENDISONE • 2022 - 2023</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Contributed to web and Android development projects</li>
              <li>Worked with Laravel, WordPress, and Android development</li>
              <li>Developed and maintained robust solutions</li>
              <li>Collaborated effectively within development team</li>
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold">MOBILE APPLICATION DEVELOPER</h3>
            <p className="mb-2">FIVERR • 2019 - 2023</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Created innovative mobile solutions for diverse clients</li>
              <li>Developed Android apps using Flutter, React Native, and native technologies</li>
              <li>Delivered tailored solutions meeting client requirements</li>
              <li>Maintained high client satisfaction and positive reviews</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2 uppercase text-black">
          Education
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">BSc (Hons) Software Engineering</h3>
            <p className="mb-2">Cardiff Metropolitan University • 2024 - Present</p>
            <p className="mt-1">HD in Computing and Software Engineering</p>
          </div>

          <div>
            <h3 className="font-semibold">HD in Computing and Software Engineering</h3>
            <p className="mb-2">ICBT Campus • 2020 - 2022</p>
          </div>

          <div>
            <h3 className="font-semibold">Diploma in Software Engineering</h3>
            <p className="mb-2">ESOFT Metro Campus • 2023 - Present</p>
          </div>

          <div>
            <h3 className="font-semibold">Diploma in Web Engineering</h3>
            <p className="mb-2">ESOFT Metro Campus • 2016 - Present</p>
          </div>

          <div>
            <h3 className="font-semibold">Advanced Level</h3>
            <ul className="list-disc list-inside mt-2">
              <li>Physics - C</li>
              <li>Biology - C</li>
              <li>Chemistry - C</li>
            </ul>
          </div>
        </div>
      </section>

      {/* <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Certifications</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold">AWS Certified Developer - Associate</h3>
            <p className="text-gray-600">Amazon Web Services • 2022</p>
          </div>
          <div>
            <h3 className="font-semibold">Mobile Application Development Professional</h3>
            <p className="text-gray-600">React Native • 2021</p>
          </div>
          <div>
            <h3 className="font-semibold">Professional Scrum Master I (PSM I)</h3>
            <p className="text-gray-600">Scrum.org • 2020</p>
          </div>
        </div>
      </section> */}

      <section>
        <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2 uppercase text-black">
          Notable Projects
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">Beggar Card Game</h3>
            <p className="mt-1">
              Cross-platform card game developed with Flutter, supporting Web, Android, and iOS platforms. 
              Features include real-time multiplayer gameplay, custom animations, and responsive design. 
              Demonstrates expertise in Flutter&apos;s advanced capabilities for gaming applications.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold">BeTracky Background Location Service</h3>
            <p className="mt-1">
              Published Flutter plugin for continuous background location tracking. 
              Enables real-time location updates even when app is terminated. 
              Available on pub.dev with comprehensive documentation and implementation examples.
              Successfully implemented in multiple production applications.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Trackable</h3>
            <p className="mt-1">
              Sales employee tracking system built with React Native (mobile) and React/Spring Boot (backend). 
              Features include real-time location tracking, field operations monitoring, and performance analytics. 
              Enhanced workforce management efficiency through integrated frontend and backend solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">BLOODME.ORG</h3>
            <p className="mt-1">
              Dual-platform blood donation service developed with native Android and Laravel. 
              Features include real-time donor location filtering, emergency alerts, and donor registration. 
              Project successfully transferred to campus team for continued development and maintenance.
            </p>
          </div>
        </div>
      </section>

      <p>Let&apos;s discuss your requirements</p>
    </Container>
  );
};

export default ResumeTemplate;
