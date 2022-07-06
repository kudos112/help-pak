import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useMediaQuery} from "@chakra-ui/react";
import Cards from "~/components/donation-item/donation-item-cards";
import FilterDonationItem from "~/components/donation-item/search-bar/filter.camp.component";
import {getDonationItems} from "~/redux/donation-item/donation-item.actions";
import styles from "./donation-item.module.scss";
import {selectDonationItems} from "~/redux/donation-item/donation-item.selector";
import ReactPaginate from "react-paginate";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";

const DonationItem = ({donationItems}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [mediumSized] = useMediaQuery("(max-width: 995px)");
  const handlePageChange = (event) => {
    setPage(event.selected);
  };

  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    category: "",
    condition: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      category: "",
      condition: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  useEffect(() => {
    dispatch(
      getDonationItems(
        handleLoading,
        filter.name,
        filter.city,
        filter.category,
        filter.condition,
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
          Donation Items
        </Heading>
        {/* {JSON.stringify(donationItems)} */}
        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterDonationItem
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
                {(donationItems == null || donationItems.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No Items Listed yet</Heading>
                  </Flex>
                )}
                {donationItems?.data.length > 0 && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards donationItems={donationItems} />
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
                        pageCount={donationItems.totalPages}
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
    donationItems: selectDonationItems(state),
  };
};

export default connect(mapStateToProps)(DonationItem);
