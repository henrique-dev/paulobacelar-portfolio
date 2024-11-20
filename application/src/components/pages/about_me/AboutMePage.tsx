export const AboutMePage = () => {
  return (
    <div className="flex justify-center">
      <div className="rounded-2xl bg-white px-8 py-10 shadow dark:bg-gray-600">
        <img alt="" src={'/image/profile.jpeg'} className="mx-auto size-48 rounded-full md:size-56" />
        <h3 className="mt-6 text-center text-base/7 font-semibold tracking-tight text-gray-700 dark:text-white">Paulo Bacelar</h3>
        <p className="text-center text-sm/6 text-gray-700 dark:text-white">Software Developer</p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <div>
            <a
              href="https://github.com/henrique-dev"
              className="text-gray-700 hover:text-main-500 dark:text-white dark:hover:text-main-400"
              target="_blank"
            >
              <span className="sr-only">Github</span>
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                <path
                  fillRule="evenodd"
                  d="
                    M12 2C6.477 2 2 6.484 2 12.017
                    c0 4.425 2.865 8.18 6.839 9.504
                    .5.092.682-.217.682-.483
                    0-.237-.008-.868-.013-1.703
                    -2.782.605-3.369-1.343-3.369-1.343
                    -.454-1.158-1.11-1.466-1.11-1.466
                    -.908-.62.069-.608.069-.608
                    1.003.07 1.531 1.032 1.531 1.032
                    .892 1.53 2.341 1.088 2.91.832
                    .092-.647.35-1.088.636-1.338
                    -2.22-.253-4.555-1.113-4.555-4.951
                    0-1.093.39-1.988 1.029-2.688
                    -.103-.253-.446-1.272.098-2.65
                    0 0 .84-.27 2.75 1.026
                    A9.564 9.564 0 0112 6.844
                    c.85.004 1.705.115 2.504.337
                    1.909-1.296 2.747-1.027 2.747-1.027
                    .546 1.379.202 2.398.1 2.651
                    .64.7 1.028 1.595 1.028 2.688
                    0 3.848-2.339 4.695-4.566 4.943
                    .359.309.678.92.678 1.855
                    0 1.338-.012 2.419-.012 2.747
                    0 .268.18.58.688.482
                    A10.019 10.019 0 0022 12.017
                    C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/henriq-dev"
              className="text-gray-700 hover:text-main-500 dark:text-white dark:hover:text-main-400"
              target="_blank"
            >
              <span className="sr-only">LinkedIn</span>
              <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                <path
                  d="
                    M16.338 16.338H13.67V12.16
                    c0-.995-.017-2.277-1.387-2.277
                    -1.39 0-1.601 1.086-1.601 2.207v4.248
                    H8.014v-8.59h2.559v1.174h.037
                    c.356-.675 1.227-1.387 2.526-1.387
                    2.703 0 3.203 1.778 3.203 4.092v4.711z

                    M5.005 6.575
                    a1.548 1.548 0 11-.003-3.096
                    1.548 1.548 0 01.003 3.096z

                    M3.667 16.338
                    H6.34v-8.59H3.667v8.59z

                    M17.668 1
                    H2.328C1.595 1 1 1.581 1 2.298
                    v15.403C1 18.418 1.595 19 2.328 19
                    h15.34c.734 0 1.332-.582 1.332-1.299
                    V2.298C19 1.581 18.402 1 17.668 1z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
