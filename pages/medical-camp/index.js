import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect, useDispatch} from "react-redux";
import Cards from "~/components/medical-camp/medical-camp-cards";
import FilterMedicalCamp from "~/components/medical-camp/search-bar/filter.camp.component";
import {getMedicalCamps} from "~/redux/medical-camp/medical-camp.actions";
import {selectMedicalCamps} from "~/redux/medical-camp/medical-camp.selector";
import styles from "./medical-camp.module.scss";

const MedicalCamp = ({medicalCamps}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    campType: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      campType: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  const handlePageChange = (event) => {
    setPage(event.selected);
  };

  useEffect(() => {
    dispatch(
      getMedicalCamps(
        handleLoading,
        filter.name,
        filter.city,
        filter.campType,
        page + 1
      )
    );
  }, [filter, page]);

  return (
    <>
      <Flex direction="column">
        <Heading m={4} ml={8} color={"customGreen"}>
          Medical Camps
        </Heading>
        {/* {JSON.stringify(medicalCamps)} */}
        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterMedicalCamp
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
                {(medicalCamps == null || medicalCamps.data.length === 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">
                      No Medical Camps Listed yet
                    </Heading>
                  </Flex>
                )}
                {medicalCamps?.data.length > 0 && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards medicalCamps={medicalCamps} />
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
                        pageCount={medicalCamps.totalPages}
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
      {/* <SmallFooter /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    medicalCamps: selectMedicalCamps(state),
  };
};

export default connect(mapStateToProps)(MedicalCamp);
