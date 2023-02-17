import ButtonRedirect from "@/components/buttons/redirectButton";
import GithubRedirect from "@/components/links/githubRedirect";

import piggyBank from "@/assets/piggy-animate.svg";
import shape from "@/assets/shape.svg";
import Logo from "@/components/links/logo";

import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      staggerChildren: 0.4,
      delay: 0.75,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" },
  },
};

const Home = () => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <header className="flex h-fit items-center justify-between p-4">
          <Logo redirect="/" />
          <GithubRedirect />
        </header>
        <img
          src={shape}
          className="absolute top-0 right-0 -z-10 w-full  opacity-50 md:w-4/5 lg:w-4/6 xl:w-7/12"
        />

        <section className="mt-10 flex flex-col items-center justify-between gap-5 lg:my-auto lg:mx-10 lg:flex-row lg:gap-20">
          <motion.img
            variants={childVariants}
            initial="initial"
            animate="visible"
            className="block w-3/4 min-w-[300px] max-w-[800px] midsm:w-3/5 md:w-1/2 lg:order-2 lg:w-full lg:min-w-[450px]"
            src={piggyBank}
            alt="Image of a person hand putting money inside a piggy bank"
          />
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="visible"
            className="mx-8 flex max-w-[700px] flex-col items-center gap-y-10 midsm:mx-14 md:mx-20 lg:order-1 lg:mx-0 lg:ml-14 lg:items-start "
          >
            <motion.h1
              variants={childVariants}
              className="text-center text-4xl font-semibold lg:text-left"
            >
              Take Control of Your Finances with Budget
              <span className="text-indigo-500">Wise</span>
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-center text-xl leading-normal lg:text-left"
            >
              Simplify your budgeting process and take control of your finances
              with our user-friendly budgeting app. Say goodbye to messy
              spreadsheets and hello to real-time tracking and analysis.
            </motion.p>
            <motion.div
              variants={childVariants}
              className="lg:mg-0 mb-10 flex w-full flex-col items-center gap-4 lg:items-start"
            >
              <ButtonRedirect
                redirect="/register"
                styles="button-primary px-10 w-full midsm:w-2/3 md:w-1/3 lg:w-fit"
                label="Sign up for free"
              />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
};
export default Home;
