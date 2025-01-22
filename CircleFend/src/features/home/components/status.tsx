import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaComment, FaHeart, FaImage } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { apiV1 } from "../../../libs/api";
import { ThreadEntity } from "../../../entities/thread";
import { useHome } from "../hooks/use-home";
import { useAppSelector } from "../../../hooks/use-store";
import Cookies from "js-cookie";
import LikeButtonThread from "../button/like";
import { set } from "react-hook-form";
import { createNextState } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  fullName: string;
  content: string;
  email: string;
  image?: string; // Menambahkan opsional untuk gambar
  user: {
    email: string;
    fullName: string;
    profileImage?: string;
  };
}
interface CommentWithLikes extends Comment {
  likesCount: number;
  isLiked: boolean;
}

export function StatusMainContent() {
  const { handleToggleLike } = useHome();
  const { threadId } = useParams<{ threadId: string }>();
  const [comments, setComments] = useState<CommentWithLikes[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [thread, setThread] = useState<ThreadEntity | null>(null);

  // Ambil userId dari Redux
  const { id } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadResponse = await apiV1.get(`/threads/${threadId}`);
        setThread(threadResponse.data);

        const commentsResponse = await apiV1.get(`/threads/${threadId}/reply`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [threadId]);

  console.log("ini reply", comments);

  const handleToggleLikeReply = async (replyId: number) => {
    console.log("ini reply id", replyId);

    try {
      const response = await apiV1.post(`/reply/${replyId}/like`);
      console.log("response like rep", response.data);

      const { isLiked, likesCount } = response.data;

      setComments((prevComments) =>
        prevComments.map((reply) =>
          reply.id === replyId ? { ...reply, isLiked, likesCount } : reply
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const formData = new FormData();
      formData.append("content", newComment);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await apiV1.post(
          `/threads/${threadId}/reply`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setComments([response.data, ...comments]);
        setNewComment("");
        setImage(null);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <Box p={4} color={"white"}>
      <HStack mb={4} spacing={4}>
        <Link to={"/"}>
          <IconButton
            icon={<ArrowBackIcon />}
            background={"transparent"}
            color={"white"}
            fontSize={"20px"}
            aria-label="Back"
          />
        </Link>
        <Text fontSize="2xl" ml={-3} fontWeight="bold">
          Status
        </Text>
      </HStack>

      {thread && (
        <Box bg="black" p={4} borderRadius="md" mb={4}>
          <VStack spacing={2} align="start">
            <HStack spacing={2}>
              <Avatar
                size="sm"
                name={thread.user.fullName}
                src={thread.user.profileImage || "https://bit.ly/dan-abramov"}
              />
              <VStack align="start" ml={2}>
                <Text fontWeight="bold">{thread.user.fullName}</Text>
                <Text fontSize={"small"} mt={-2} color={"grey"}>
                  @{thread.user.fullName}
                </Text>
              </VStack>
            </HStack>
            <Text>{thread.content}</Text>
            {thread?.image && (
              <Image
                src={thread.image}
                alt="Thread image"
                borderRadius="md"
                maxW="400px"
                mx="auto"
              />
            )}
            <HStack spacing={4} mt={2}>
              <HStack spacing={1} align="center">
                <IconButton
                  size="sm"
                  color={thread.isLiked ? "red" : "gray"}
                  background={"transparent"}
                  aria-label="Like"
                  onClick={() => handleToggleLike(id, thread.id)}
                  icon={<FaHeart />}
                />
                <Text fontSize="sm" color={thread.isLiked ? "red" : "gray"}>
                  {thread.likesCount}
                </Text>
              </HStack>
              <HStack spacing={1} align="center">
                <IconButton
                  size="sm"
                  color="grey"
                  background={"transparent"}
                  aria-label="Comment"
                  icon={<FaComment />}
                />
                <Text fontSize="sm" color="gray">
                  {comments.length} Replies
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      )}

      <Divider my={4} />
      <Box
        mb={6}
        p={4}
        borderRadius="md"
        border="1px solid black"
        bg="black"
        color="white"
      >
        <HStack spacing={4}>
          <Avatar
            size="sm"
            name={thread?.user.fullName}
            src={thread?.user.profileImage || "https://bit.ly/dan-abramov"}
          />
          <VStack align="start" flex="1">
            <InputGroup>
              <Input
                placeholder="What's on your mind?"
                value={newComment}
                onChange={handleCommentChange}
                bg="black"
                color="white"
                borderRadius="md"
                border={"1px grey solid"}
                pr="120px"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommentSubmit();
                  }
                }}
              />
              <InputRightElement>
                <HStack spacing={2} ml={-20}>
                  <IconButton
                    as="label"
                    htmlFor="image-upload"
                    aria-label="Upload Image"
                    icon={<FaImage />}
                    color="white"
                    bg="transparent"
                    size="md"
                    borderRadius="md"
                    _hover={{ bg: "grey" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Button
                    bg="brand.main"
                    color="white"
                    p={3}
                    onClick={handleCommentSubmit}
                    size="xs"
                    borderRadius="full"
                    _hover={{ bg: "green.400" }}
                  >
                    Reply
                  </Button>
                </HStack>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </HStack>
      </Box>

      <VStack spacing={3} align="start">
        {comments.map((comment) => {
          return (
            <Box key={comment.id} p={2} borderRadius="md" width="full">
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={comment?.user?.fullName}
                  src={
                    comment?.user?.profileImage || "https://bit.ly/dan-abramov"
                  }
                />
                <Text fontWeight="bold">{comment?.user?.fullName}</Text>
                <Text fontSize={"small"} color={"grey"}>
                  {comment?.user?.email}
                </Text>
                <Text color="gray" fontSize={"small"}>
                  2h
                </Text>
              </HStack>
              <Text mt={1}>{comment.content}</Text>
              {comment.image && (
                <Image
                  src={comment.image}
                  alt="Comment image"
                  width={40}
                  height={40}
                  borderRadius="md"
                />
              )}
              <HStack spacing={4} mt={2}>
                <HStack spacing={1} align="center">
                  <IconButton
                    size="sm"
                    color={comment.isLiked ? "red" : "gray"}
                    background={"transparent"}
                    aria-label="Like"
                    onClick={() => handleToggleLikeReply(comment.id)}
                    icon={<FaHeart />}
                  />
                  <Text fontSize="sm" color={"gray"}>
                    {comment.likesCount}
                  </Text>
                </HStack>
                <HStack spacing={1} align="center">
                  <IconButton
                    size="sm"
                    color="grey"
                    background={"transparent"}
                    aria-label="Comment"
                    icon={<FaComment />}
                  />
                  <Text fontSize="sm" color="gray">
                    {comments.length} Replies
                  </Text>
                </HStack>
              </HStack>
              <Divider my={4} />
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
