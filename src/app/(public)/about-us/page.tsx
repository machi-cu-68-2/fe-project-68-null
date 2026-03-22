import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  const contributors = [
    {
      name: "Tanakrit Onjinda",
      id: "6833104021",
      role: "Contributor",
    },
    {
      name: "Suphachok Chosanthia",
      id: "6833258021",
      role: "Contributor",
    },
    {
      name: "Theanrawich Thungpromsri",
      id: "6833127521",
      role: "Contributor",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fefaec]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about-us.png"
          alt="About Us Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-playfair-display font-bold text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
            About Our Team
          </h1>
          <p className="font-sans text-lg md:text-xl text-[rgba(255,255,255,0.9)] max-w-2xl mx-auto drop-shadow-md">
            Dedicated students pushing the boundaries of culinary technology.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair-display font-bold text-4xl text-[#724a15] mb-4">Our Contributors</h2>
          <div className="h-1 w-20 bg-[#ce7b11] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {contributors.map((member) => (
            <div 
              key={member.id}
              className="group bg-white/70 backdrop-blur-md rounded-[2.5rem] border-2 border-[#f8e9a1] p-10 hover:border-[#ce7b11] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-[#724a15] rounded-2xl flex items-center justify-center text-white font-playfair-display text-3xl font-bold mb-8 group-hover:bg-[#ce7b11] transition-colors duration-500">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-playfair-display font-bold text-2xl text-[#724a15] mb-2">{member.name}</h3>
              <p className="text-[rgba(114,74,21,0.6)] font-semibold text-sm tracking-widest uppercase mb-4">{member.role}</p>
              <div className="pt-6 border-t border-[#f8e9a1] text-[#724a15] font-mono text-lg">
                ID: {member.id}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub CTA Section */}
      <section className="pb-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#724a15] rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-10 -mb-10 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10">
            <h2 className="font-playfair-display font-bold text-3xl md:text-4xl mb-6">Explore Our Project</h2>
            <p className="text-[rgba(255,255,255,0.8)] text-lg mb-10 max-w-xl mx-auto">
              Check out our codebase and contribute to the evolution of restaurant reservations.
            </p>
            
            <Link 
              href="https://github.com/machi-cu-68-2/fe-project-68-null"
              target="_blank"
              className="inline-flex items-center gap-3 bg-white text-[#724a15] px-10 py-5 rounded-full font-bold text-xl hover:bg-[#fefaec] hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <svg 
                className="w-7 h-7" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
