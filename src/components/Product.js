
import { PseudoBox, Image, Flex, Button, Box, Badge, Icon, RadioButtonGroup } from '@chakra-ui/core'

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "red" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

export const ProductBox = ({region}) => {
  const property = {
    imageUrl: "blood_test.png",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: region,
    formattedPrice: "$19.00",
    reviewCount: 34,
    rating: 4,
    sti_testing: false,
    oral_contraception: false,
    served_location: "served_locations",
    quota: 1,
    class: 'front'
  };

  return (
      <PseudoBox
        role="group"
        maxW="sm"
        overflow="hidden"
        rounded="md"
        transition="transform 0.8s"
        transform-style="preserve-3d"
        p={5}
        cursor="pointer"
        _hover={{ transform: "rotateY(180deg)"}}
        >
    <Box
      className={property.class}
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      boxShadow="md"
      pb="10px">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>
          Sti Enabled: {property.sti_testing ? 'yes': 'no'}
        </Box>

        <Box>
          Oral Enabled: {property.oral_testing ? 'yes': 'no'}
        </Box>

        <Box>
          Location rule: {property.location_rule}
        </Box>

        <Box>
          Quota remaining: {property.quota}
        </Box>

      </Box>
    </Box>
      </PseudoBox>
  );
}

export const ProductSelection = ({ title }) => (
    <RadioButtonGroup
        defaultValue="rad2"
        pt="20px"
        pb="20px"
        onChange={val => console.log(val)}
        isInline
        >
        <CustomRadio value="rad1">Sti tests</CustomRadio>
        <CustomRadio value="rad2">Contrception</CustomRadio>
    </RadioButtonGroup>
);

ProductSelection.defaultProps = {
  title: 'Regions',
}

ProductBox.defaultProps = {
  region: ''
}
