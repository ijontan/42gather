-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "intraID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "discordID" TEXT,
    "discordToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "venue" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL,
    "limit" INTEGER,
    "color" INTEGER NOT NULL,
    "tags" INTEGER[],
    "reminders" INTEGER[],
    "creatorID" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipants" (
    "eventID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "EventParticipants_pkey" PRIMARY KEY ("eventID","userID")
);

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_intraID_key" ON "User"("intraID");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
