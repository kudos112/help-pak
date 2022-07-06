import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect, useDispatch} from "react-redux";
import Cards from "~/components/medical-assistance/medical-assistance-cards";
import FilterMedicalAssistance from "~/components/medical-assistance/search-bar/filter.assistance.component";
import {getMedicalAssistances} from "~/redux/medical-service/medical-service.actions";
import {selectMedicalAssistances} from "~/redux/medical-service/medical-service.selector";
import styles from "./medical-assistance.module.scss";

const MedicalAssistance = ({medicalAssistances}) => {
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
    serviceType: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      serviceType: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  useEffect(() => {
    dispatch(
      getMedicalAssistances(
        handleLoading,
        filter.name,
        filter.city,
        filter.serviceType,
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
          Medical Assistance Services
        </Heading>

        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterMedicalAssistance
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
                {(medicalAssistances == null ||
                  medicalAssistances.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No services Listed yet</Heading>
                  </Flex>
                )}
                {medicalAssistances?.data.length > 0 && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards medicalAssistances={medicalAssistances} />
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
                        pageCount={medicalAssistances.totalPages}
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
    medicalAssistances: selectMedicalAssistances(state),
  };
};

export default connect(mapStateToProps)(MedicalAssistance);
