import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(12);

  const { search } = useLocation();
  const apply1 = () => {
    const min = minRef.current.value ? parseInt(minRef.current.value) : 0;
    const max = maxRef.current.value ? parseInt(maxRef.current.value) : 10; // Defaulting to a large max value if input is empty
    setMinPrice(min);
    setMaxPrice(max);
  };
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          // `/gigs${search}&min=${0}&max=${200}&sort=${sort}`
          `/gigs/`
        )
        .then((res) => {
          return res.data;
          // console.log(res.data);
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
    console.log('here...')
  };

  return (
    <div className="gigs">
      <div className="container">
      <span className="breadcrumbs">Flint &gt; Graphics &amp; Design &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Flint's AI artists
        </p>
        <div className="menu">
          <div className="left">
          <span>Budget</span>
      <input ref={minRef} type="number" placeholder="min" />
      <input ref={maxRef} type="number" placeholder="max" />
      <button onClick={apply1}>Apply</button>

          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data
            ?.filter(gig => gig.price >= minPrice && gig.price <= maxPrice)
            .map(gig => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
