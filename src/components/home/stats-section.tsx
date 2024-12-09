interface Stat {
  value: string;
  label: string;
  description: string;
  bgColor: string;
}

const stats: Stat[] = [
  {
    value: "$3.45 M+",
    label: "Total amount raised",
    description:
      "More than millions of rupiah from all of you who have supported us to give good results for our brothers and sisters",
    bgColor: "bg-[#ffebbd]",
  },
  {
    value: "834+",
    label: "Successful campaigns",
    description:
      "Many from the charity community around the world who have collaborated and helped us to grow",
    bgColor: "bg-[#ffbded]",
  },
  {
    value: "938+",
    label: "People helped",
    description:
      "There have been many of our brothers who have been affected and supported by us for proper education",
    bgColor: "bg-[#cabdff]",
  },
  {
    value: "792+",
    label: "Regular donors",
    description:
      "Over millions of dollars from all of you who have supported our cause to bring good results to brother kits",
    bgColor: "bg-[#ffd1bd]",
  },
];

export function StatsSection() {
  return (
    <div className="w-full bg-background-two">
      <div className="max-w-[1440px] mx-auto">
        <section className="flex justify-center py-20 text-black">
          <div className="container py-16">
            <h2 className="text-6xl font-bold text-center mb-4 max-w-2xl mx-auto">
              Our mission is to help those in need.
            </h2>
            <p className="text-center text-xl font-semibold mb-12">
              Some results and support from all of you!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.bgColor} p-8 rounded-lg text-left space-y-2`}
                >
                  <div className="text-4xl font-bold text-black">
                    {stat.value}
                  </div>
                  <div className="font-semibold">{stat.label}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
