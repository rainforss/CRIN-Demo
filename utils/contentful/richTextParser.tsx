import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Inline, INLINES, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

const Bold = ({ children }: any) => <Box as="b">{children}</Box>;

export const richTextParserOption: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields;
      return (
        <Box w="500px" mx="auto" my={16}>
          <Image
            src={`https:${file.url}`}
            alt={title}
            width={file.details.image.width}
            height={file.details.image.height}
          />
        </Box>
      );
    },
    [INLINES.HYPERLINK]: (node) => {
      return (
        <Box
          as="a"
          href={node.data.uri as string}
          textDecor="underline"
          fontWeight="bold"
          color="#548D9A"
        >
          {node.content.map((c: any) => c.value)}
        </Box>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <Box as="b" color="#548D9A">
        {text}
      </Box>
    ),
  },
};
