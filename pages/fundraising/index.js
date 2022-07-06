import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect, useDispatch} from "react-redux";
import Cards from "~/components/fundraising/fundraising-cards";
import FilterFundraising from "~/components/fundraising/search-bar/filter.component";
import {getFundraisings} from "~/redux/fundraising/fundraising.actions";
import {selectFundraisings} from "~/redux/fundraising/fundraising.selector";
// import {getMedicalAssistances} from "~/redux/fundraising/fundraising.actions";
import styles from "./fundraising.module.scss";

const Fundraising = ({fundraisings}) => {
  const [loading, setLoading] = useState(true);
  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({
    name: "",
    city: "",
    reason: "",
    bankName: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      reason: "",
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
    dispatch(
      getFundraisings(
        handleLoading,
        filter.name,
        filter.city,
        filter.reason,
        page + 1
      )
    );
  }, [filter, page]);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <>
      <Flex direction="column">
        <Heading m={4} ml={8} color={"customGreen"}>
          Fundraising
        </Heading>

        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterFundraising
              handleLoading={handleLoading}
              filter={filter}
              handleData={handleData}
              resetFilter={resetFilter}
            />
          </div>

          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(fundraisings == null || fundraisings.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">
                      No Fundraising Listed yet
                    </Heading>
                  </Flex>
                )}
                {fundraisings?.data.length > 0 && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards fundraisings={fundraisings} />
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
                        pageCount={fundraisings.totalPages}
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
    fundraisings: selectFundraisings(state),
  };
};

export default connect(mapStateToProps)(Fundraising);
