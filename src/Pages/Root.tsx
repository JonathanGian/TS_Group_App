import { Outlet } from "react-router-dom";


// Outlet if we need it

const Root = () => {
  return (
    <>
        {/* Header? */}
        <Outlet />
        {/* Footer? */}
         </>
  );
};

export default Root;
