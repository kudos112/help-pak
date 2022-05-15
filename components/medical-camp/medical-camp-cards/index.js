import {SimpleGrid} from "@chakra-ui/react";
import CarouselCard from "~/components/data/medical-camp/card-carousel.component";

const Cards = ({medicalCamps}) => {
  return (
    <SimpleGrid
      columns={6}
      minChildWidth={{base: "200px", md: "280px", lg: "280px", sm: "200px"}}
      spacing={1}
    >
      {medicalCamps.data.map((data, index) => {
        return <CarouselCard data={data} key={index} />;
      })}
    </SimpleGrid>
  );
};

export default Cards;