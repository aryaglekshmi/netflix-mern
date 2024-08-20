import { Link } from "react-router-dom";
function Navbar({isScrolled}) {
  
  const tabs = [
    { name: 'Home', path:'/'},
    { name: 'TV Shows', path:'/tv'},
    { name: 'Movies', path:'/movies'},
    { name: 'My List', path:'/mylist'},
  ]
  return (
    // <nav className="navbar navbar-expand-lg bg-dark-bg navHeight">
    //   <div className="container-fluid">
    //     <img
    //       src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
    //       alt="Netflix Logo"
    //       style={{ width: "100px", height: "40px" }}
    //     />
    //         <div>
    //           {
    //             tabs.map((tab,ind)=>(
    //                <Link to={tab.path} key={ind} className="px-2"> 
    //                 {tab.name}
    //                 </Link>
    //             ))
    //           }
    //         </div>
    //       <form className="d-flex">
    //         <input
    //           className="form-control me-2 bg-light-gray text-dark-bg"
    //           type="search"
    //           placeholder="Search"
    //           aria-label="Search"
    //         />
    //         <button className="btn btn-outline-light" type="submit">
    //           Search
    //         </button>
    //       </form>
    //   </div>
    // </nav>
    <nav>

    </nav>
  );
}

export default Navbar;
