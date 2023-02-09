import ButtonRedirect from "../../components/buttons/redirectButton";
import GithubRedirect from "../../components/links/githubRedirect";

const Home = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <header className="flex items-center justify-between p-4">
          <p className="text-2xl font-semibold">
            Budget<span className="text-purple-500">Wise</span>
          </p>
          <GithubRedirect />
        </header>
        <section className="ml-20 flex w-1/2 flex-1 items-center justify-center gap-12">
          <div className="flex flex-col gap-y-10">
            <h1 className="text-5xl font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="w-9/12 text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio
              nam, nisi sunt nihil molestiae neque temporibus iure, dolores
              nobis aliquid maiores vel facilis quas ea laborum quam incidunt
              cupiditate explicabo!
            </p>
            <div className="flex w-5/12 items-center gap-4">
              <ButtonRedirect
                redirect="/register"
                styles="flex-1 text-base bg-slate-900 text-white hover:bg-purple-500"
                label="Get started"
              />
              <ButtonRedirect
                redirect=".."
                styles="flex-1 text-base bg-white text-purple-500 ring-1 ring-purple-500"
                label="About"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;
