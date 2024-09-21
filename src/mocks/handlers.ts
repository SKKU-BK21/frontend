import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/conferences", () => {
    return HttpResponse.json({
      pageNumber: 1,
      pageSize: 10,
      totalPages: 5,
      totalElements: 42,
      data: [
        {
          id: 1,
          acronym: "SOSP",
          ratings: [
            {
              year: 2023,
              rating: "top",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 16.7,
          average: 3.5,
        },
        {
          id: 2,
          acronym: "NSDI",
          ratings: [
            {
              year: 2023,
              rating: "excellence",
            },
            {
              year: 2022,
              rating: "top",
            },
          ],
          proportion: 14.3,
          average: 3.7,
        },
        {
          id: 3,
          acronym: "EuroSys",
          ratings: [
            {
              year: 2023,
              rating: "excellence",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 11.9,
          average: 3.9,
        },
        {
          id: 4,
          acronym: "ASPLOS",
          ratings: [
            {
              year: 2023,
              rating: "top",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 9.5,
          average: 4.1,
        },
        {
          id: 5,
          acronym: "SIGCOMM",
          ratings: [
            {
              year: 2023,
              rating: "excellence",
            },
            {
              year: 2022,
              rating: "top",
            },
          ],
          proportion: 7.1,
          average: 4.3,
        },
        {
          id: 6,
          acronym: "USENIX ATC",
          ratings: [
            {
              year: 2023,
              rating: "excellence",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 4.8,
          average: 4.5,
        },
        {
          id: 7,
          acronym: "FAST",
          ratings: [
            {
              year: 2023,
              rating: "top",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 2.4,
          average: 4.7,
        },
        {
          id: 8,
          acronym: "ICDCS",
          ratings: [
            {
              year: 2023,
              rating: "excellence",
            },
            {
              year: 2022,
              rating: "top",
            },
          ],
          proportion: 0.0,
          average: 4.9,
        },
        {
          id: 9,
          acronym: "ICDE",
          ratings: [
            {
              year: 2023,
              rating: "excellence",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 10.0,
          average: 5.1,
        },
        {
          id: 10,
          acronym: "VLDB",
          ratings: [
            {
              year: 2023,
              rating: "top",
            },
            {
              year: 2022,
              rating: "excellence",
            },
          ],
          proportion: 8.6,
          average: 5.3,
        },
      ],
    });
  }),
  http.get("/api/conferences/:id", () => {
    return HttpResponse.json({
      id: 1,
      acronym: "SOSP",
      fullName: "Symposium on Operating Systems Principles",
      ratings: [
        {
          year: 2023,
          rating: "top",
        },
        {
          year: 2022,
          rating: "excellence",
        },
      ],
      proportions: [
        {
          country: "USA",
          proportion: 16.7,
        },
        {
          country: "CN",
          proportion: 14.3,
        },
        {
          country: "UK",
          proportion: 11.9,
        },
        {
          country: "KOR",
          proportion: 10.0,
        },
        {
          country: "DE",
          proportion: 9.5,
        },
        {
          country: "AD",
          proportion: 8.6,
        },
        {
          country: "FR",
          proportion: 7.1,
        },
        {
          country: "CA",
          proportion: 4.8,
        },
        {
          country: "AU",
          proportion: 2.4,
        },
      ],
    });
  }),
  http.post("/api/conferences/:id/publications", () => {
    return HttpResponse.json({
      pageNumber: 1,
      pageSize: 10,
      totalPages: 5,
      totalElements: 42,
      data: [
        {
          id: 1,
          title: "The Evolution of Linux Memory Management",
          authors: ["Rik van Riel", "Mel Gorman"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 2,
          title: "The Design and Implementation of the FreeBSD Operating System",
          authors: ["Marshall Kirk McKusick", "George V. Neville-Neil"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 3,
          title: "The Art of Multiprocessor Programming",
          authors: ["Maurice Herlihy", "Nir Shavit"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 4,
          title: "The Linux Programming Interface",
          authors: ["Michael Kerrisk"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 5,
          title: "The Art of Computer Programming",
          authors: ["Donald E. Knuth"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 6,
          title: "The C Programming Language",
          authors: ["Brian W. Kernighan", "Dennis M. Ritchie"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 7,
          title: "The Mythical",
          authors: ["Fred Brooks"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 8,
          title: "The Pragmatic Programmer",
          authors: ["Andrew Hunt", "David Thomas"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 9,
          title: "The Clean Coder",
          authors: ["Robert C. Martin"],
          publicationYear: 2023,
          citationCount: 42,
        },
        {
          id: 10,
          title: "The Phoenix Project",
          authors: ["Gene Kim", "Kevin"],
          publicationYear: 2023,
          citationCount: 42,
        },
      ],
    });
  }),
];
