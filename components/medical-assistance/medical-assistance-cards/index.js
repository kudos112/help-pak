import {SimpleGrid} from "@chakra-ui/react";
import CarouselCard from "~/components/partial-components/medical-assistance/card-carousel.component";

const Cards = ({medicalAssistances}) => {
  return (
    <SimpleGrid
      columns={6}
      minChildWidth={{base: "200px", md: "250px", lg: "250px", sm: "200px"}}
      spacing={3}
    >
      {medicalAssistances.data.map((data, index) => {
        return <CarouselCard data={data} key={index} />;
      })}
    </SimpleGrid>
  );
};

export default Cards;

// <Wrap spacing={"30px"}>
//   <WrapItem>
//     <Center w="180px" h="80px" bg="red.200">
//       {medicalAssistances.data.map((data, index) => {
//         return <CarouselCard data={data} key={index} />;
//       })}
//     </Center>
//   </WrapItem>
// </Wrap>;
