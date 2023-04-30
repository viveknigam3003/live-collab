import {
  AppShell,
  Box,
  Center,
  Header,
  Image,
  Navbar,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "./store";
import { fetchImagesRequest } from "./store/images/actions";
import { Image as ImageType } from "./store/images/types";

function App() {
  const dispatch = useDispatch();
  const imageList = useSelector((state: ApplicationState) => state.images.data);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null); // imageList[0]
  const { classes } = useStyles();

  useEffect(() => {
    dispatch(fetchImagesRequest());
  }, []);

  return (
    <AppShell
      classNames={{ main: classes.rootContainer }}
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Stack>
            {imageList.map((image, index) => (
              <Box key={image.id}>
                <Text
                  color={Number(selectedImage?.id) === index ? "grape" : "dark"}
                  weight={Number(selectedImage?.id) === index ? 700 : 400}
                  onClick={() => setSelectedImage(imageList[index])}
                  style={{ cursor: "pointer" }}
                >
                  Image {index + 1}
                </Text>
              </Box>
            ))}
          </Stack>
        </Navbar>
      }
      header={
        <Header height={60} p="sm">
          <Title order={2}>Image Gallery</Title>
        </Header>
      }
    >
      <Box h={"100%"}>
        <Center h={"100%"} className={classes.imageContainer}>
          {selectedImage && (
            <Image
              src={selectedImage?.download_url}
              width={selectedImage?.width * 0.2}
              height={selectedImage?.height * 0.2}
              alt={selectedImage?.author}
              classNames={{ image: classes.imageItem }}
              caption={`Image by ${selectedImage?.author}`}
            />
          )}
        </Center>
      </Box>
    </AppShell>
  );
}

export default App;

const useStyles = createStyles({
  rootContainer: {
    height: "100vh",
    overflow: "hidden",
  },
  imageContainer: {
    // flexBasis: "75%",
  },
  imageItem: {
    // soft deep shadow
    boxShadow: "0px 20px 25px 2px rgba(0, 0, 0, 0.20)",
    borderRadius: 8,
  },
  commentsContainer: {
    // flexBasis: "25%",
  },
});
