import {SimpleGrid} from "@chakra-ui/react";
import CarouselCard from "~/components/partial-components/ngo/card-carousel.component";

const Cards = ({ngos}) => {
  return (
    <SimpleGrid
      columns={6}
      minChildWidth={{base: "200px", md: "250px", lg: "250px", sm: "200px"}}
      spacing={3}
    >
      {ngos.data.map((data, index) => {
        return <CarouselCard data={data} key={index} />;
      })}
    </SimpleGrid>
  );
};

export default Cards;
