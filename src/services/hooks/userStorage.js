// import { useEffect, useContext } from "react";
// import { Context } from "../../context/context"

// export const useStorageContent = () => {
//   const { user, setUser } = useContext(Context);
//   useEffect(() => {
//     const storageContent = () => {
//       const sessionToken = sessionStorage.getItem('@AuthFirebase: token');
//       const sessionUser = sessionStorage.getItem('@AuthFirebase: user');
//       if (sessionToken && sessionUser) { setUser(JSON.parse(user)) };
//     };

//      storageContent();
//   }, []);
// }