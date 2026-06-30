const HistoryHero = () => {
  return (
    <section className="py-40">
      <span className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
        History
      </span>

      <h1 className="mt-6 text-5xl font-bold">
        Meeting
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
          History
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
        View every meeting you've created. Quickly copy the meeting link or
        rejoin any meeting whenever you need.
      </p>
    </section>
  );
};

export default HistoryHero;
