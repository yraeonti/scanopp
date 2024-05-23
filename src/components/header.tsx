import { HeaderLogo } from "./header-logo";

export const Header = () => {
  return (
    <header className="py-6 px-4 lg:px-8 border-b-2 ">
      <div className="max-w-screen-4xl mx-auto">
        <div className="flex items-center  lg:gap-x-16">
          <HeaderLogo />
          {/* <Navigation /> */}

          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
};
