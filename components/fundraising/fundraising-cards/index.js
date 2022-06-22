import {SimpleGrid} from "@chakra-ui/react";
import CarouselCard from "~/components/partial-components/fundraising/card-carousel.component";

const Cards = ({fundraisings}) => {
  return (
    <SimpleGrid
      columns={6}
      minChildWidth={{base: "200px", md: "250px", lg: "250px", sm: "200px"}}
      spacing={3}
    >
      {fundraisings.data.map((data, index) => {
        return <CarouselCard data={data} key={index} />;
      })}
    </SimpleGrid>
  );
};

export default Cards;
