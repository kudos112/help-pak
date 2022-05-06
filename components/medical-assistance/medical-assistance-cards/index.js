import {SimpleGrid} from "@chakra-ui/react";
import CarouselCard from "~/components/data/card/card-carousel.component";

const Cards = ({medicalAssistances}) => {
  return (
    <SimpleGrid
      columns={6}
      minChildWidth={{base: "200px", md: "280px", lg: "280px", sm: "200px"}}
      spacing={1}
    >
      {medicalAssistances.data.map((data, index) => {
        return <CarouselCard data={data} key={index} />;
      })}
    </SimpleGrid>
  );
};

export default Cards;
