import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect, useDispatch} from "react-redux";
import Cards from "~/components/ngo/ngo-cards";
import FilterFundraising from "~/components/ngo/search-bar/filter.component";
import {getNgos} from "~/redux/ngo/ngo.actions";
import {selectNgos} from "~/redux/ngo/ngo.selector";
import styles from "./ngo.module.scss";

const Fundraising = ({ngos}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    bankName: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      bankName: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  const handlePageChange = (event) => {
    setPage(event.selected);
  };

  useEffect(() => {
    dispatch(getNgos(handleLoading, filter.name, filter.city, page + 1));
  }, [filter, page]);

  return (
    <>
      <Flex direction="column">
        <Heading m={4} ml={8} color={"customGreen"}>
          NGO
        </Heading>

        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterFundraising
              handleLoading={handleLoading}
              filter={filter}
              resetFilter={resetFilter}
              handleData={handleData}
            />
          </div>

          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(ngos == null || ngos.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No NGO Listed yet</Heading>
                  </Flex>
                )}
                {ngos?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards ngos={ngos} />
                    <Flex justify={"end"} m={4}>
                      <ReactPaginate
                        previousLabel={<ArrowLeftIcon />}
                        nextLabel={<ArrowRightIcon />}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link previous"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={ngos.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={page}
                      />
                    </Flex>
                  </Flex>
                )}
              </div>
            )}
          </div>
        </div>
      </Flex>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ngos: selectNgos(state),
  };
};

export default connect(mapStateToProps)(Fundraising);
