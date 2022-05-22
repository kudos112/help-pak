import {SimpleGrid} from "@chakra-ui/react";
import CarouselCard from "~/components/partial-components/donation-item/card-carousel.component";

const Cards = ({donationItems}) => {
  return (
    <SimpleGrid
      columns={6}
      minChildWidth={{base: "200px", md: "250px", lg: "250px", sm: "200px"}}
      spacing={3}
    >
      {donationItems.data.map((data, index) => {
        return <CarouselCard data={data} key={index} />;
      })}
    </SimpleGrid>
  );
};

export default Cards;
