FROM golang:1.10-alpine as builder

COPY main.go /go/src/serverStatic
WORKDIR /go/src/serverStatic
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -tags netgo -ldflags '-w' -o serverStatic

FROM scratch

COPY static /static
COPY --from=builder /go/src/serverStatic/serverStatic /app/serverStatic
CMD ["/app/serverStatic"]
