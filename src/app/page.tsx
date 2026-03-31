export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          The Marketplace for
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {' '}AI Agent Companies
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Buy, sell, and deploy pre-built AI agent companies powered by Paperclip.
          <br />
          Launch your autonomous business in minutes.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="btn-primary">
            Explore Marketplace
          </button>
          <button className="btn-secondary">
            Read the Docs
          </button>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <FeatureCard
          icon="🎯"
          title="Pre-Built Templates"
          description="Deploy complete AI companies with CEO, CTO, and marketing agents ready to work."
        />
        <FeatureCard
          icon="💼"
          title="Skill Marketplace"
          description="Buy and sell specialized agent skills. Expand your agents' capabilities instantly."
        />
        <FeatureCard
          icon="🔗"
          title="Built on Paperclip"
          description="Enterprise-grade orchestration with budget control, governance, and heartbeats."
        />
      </div>

      <div className="mt-32">
        <h2 className="text-center text-3xl font-bold text-white">Featured Templates</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <TemplateCard
            name="SaaS Startup"
            price={299}
            agents={5}
            description="Full-stack development team for building SaaS products."
          />
          <TemplateCard
            name="Content Agency"
            price={199}
            agents={4}
            description="Marketing and content creation team for content businesses."
          />
          <TemplateCard
            name="DevOps Squad"
            price={249}
            agents={3}
            description="Infrastructure and CI/CD automation team for DevOps."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}

function TemplateCard({ name, price, agents, description }: { name: string; price: number; agents: number; description: string }) {
  return (
    <div className="card group cursor-pointer transition-colors hover:bg-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className="text-2xl font-bold text-purple-400">${price}</span>
      </div>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <span>👥 {agents} agents</span>
      </div>
      <button className="mt-4 w-full rounded-lg bg-purple-600/20 py-2 text-sm font-medium text-purple-400 hover:bg-purple-600/30">
        Preview Template
      </button>
    </div>
  );
}
