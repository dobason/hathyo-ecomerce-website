export interface Post {
  author: string;
  content: string;
  createdAt: string;
  id: string | number;
  permalink: string;
  series: API.Series;
  tags: TagItem[];
  thumbnail: string;
  title: string;
  topic: { id: number; name: string };
  updatedAt: string;
  themeQuestion: string;
  visibility: string;
  indexOfContent?: {
    heading: string | undefined;
    content: string | undefined;
  }[];
  relatedPosts?: Post[];
  description: string;
  comment?: any;
}
