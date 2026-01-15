import { FaArrowRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    excerpt:
      "Many people underestimate the long-term impact of regular blood donation. Discover how a single donor can help dozens of patients over time.",
    date: "Jan 12, 2026",
    image: "https://i.ibb.co.com/0VmfmK1Q/Screenshot-2024-01-23-111543-9f66162158dfc1ee-1024x588.png",
  },
  {
    id: 2,
    title: "Emergency Blood Requests: What You Should Know",
    excerpt:
      "Understanding how emergency blood requests work can help you respond faster and save lives during critical moments.",
    date: "Jan 05, 2026",
  },
  {
    id: 3,
    title: "Who Can Donate Blood? Common Myths Explained",
    excerpt:
      "There are many misconceptions around blood donation. We break down the most common myths with medical facts.",
    date: "Dec 28, 2025",
  },
  {
    id: 4,
    title: "How Red Care Ensures Donor & Patient Safety",
    excerpt:
      "Safety is our top priority. Learn how Red Care verifies donors and protects patient data at every step.",
    date: "Dec 15, 2025",
  },
];

const Blogs = () => {
  return (
    <section className="relative py-28 px-6 lg:px-28 bg-base-100 overflow-hidden">
      {/* Header */}
      <div className="mb-20 max-w-4xl">
        <div className="text-primary font-semibold tracking-[3px] uppercase mb-4">
          Latest Insights
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-base-300 mb-6">
          Stories, Knowledge & Awareness
        </h2>
        <p className="text-accent text-lg max-w-2xl">
          Explore expert-written articles, real-life experiences, and essential
          information about blood donation and community health.
        </p>
      </div>

      {/* Featured Blog */}
      <div className="group relative mb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="overflow-hidden">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div>
          <span className="text-sm text-accent uppercase tracking-wider">
            Featured • {blogs[0].date}
          </span>

          <h3 className="text-3xl font-bold text-base-300 mt-4 mb-6 leading-tight underline-offset-8 decoration-primary">
             Why Regular <span className="text-primary red-glow">Blood Donation</span> Saves More Lives Than You Think
          </h3>

          <p className="text-accent text-lg leading-relaxed mb-8">
            {blogs[0].excerpt}
          </p>

         </div>
      </div>

      {/* Blog Flow (No Cards) */}
      <div className="max-w-3xl space-y-14">
        {blogs.slice(1).map((blog) => (
          <div
            key={blog.id}
            className="group border-l-2 border-primary/30 pl-8 relative"
          >
            <span className="absolute -left-[7px] top-2 w-3 h-3 bg-primary rounded-full"></span>

            <span className="text-sm text-accent uppercase tracking-wide">
              {blog.date}
            </span>

            <h4 className="text-2xl font-semibold text-base-300 mt-3 mb-4 group-hover:text-primary transition">
              {blog.title}
            </h4>

            <p className="text-accent leading-relaxed mb-4">
              {blog.excerpt}
            </p>

           </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
